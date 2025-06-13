const User = require('../models/user')
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();


// generateTokens 
async function generateTokens(user, regenerateRefreshToken = false) {
    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30d" }
    );

    let refreshToken = user.refreshToken;
    let refreshTokenExpiry = user.refreshTokenExpiry;

    if (regenerateRefreshToken || !refreshToken || new Date() > refreshTokenExpiry) {
        refreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "40d" }
        );
        refreshTokenExpiry = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

        user.set({ refreshToken, refreshTokenExpiry });
        await user.save(); 
    }

    return { accessToken, refreshToken, refreshTokenExpiry };
}

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Access Denied" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      userName: 'Aya Anwar',
      email: process.env.ADMIN_EMAIL,
      password,
      role: 'admin'
    });
    console.log(' Admin user created and saved in DB');

    const { accessToken, refreshToken } = await generateTokens(user);
    return res.status(200).json({
    message: "Login Successfully",
    accessToken,
    refreshToken,
    
  });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('incoming:', password, 'stored hash:', user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Email or password is invalid" });
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  return res.status(200).json({
    message: "Login Successfully",
    accessToken,
    refreshToken,
    
  });
});