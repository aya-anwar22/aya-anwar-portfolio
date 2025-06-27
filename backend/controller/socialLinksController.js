const asyncHandler = require('express-async-handler');
const SocialLinks = require('../models/socialLinks')

exports.addsocialLinks = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    // if (!isAdmin) {
    //     return res.status(403).json({ message: 'Access denied' });
    // }
    const {platform, url} = req.body;
 
    const newsocialLinks = await SocialLinks.create({
        platform, url
    })
    await newsocialLinks.save();
    res.status(201).json({
        message: "socialLinks creat Seccessfully"
    })
})


exports.getSocialLinks = asyncHandler(async(req, res) =>{
    const socialLinks = await SocialLinks.find();

    res.status(200).json({socialLinks});
})

exports.getSocialLinksById = asyncHandler(async(req, res) =>{
    const socialLinksId = req.params.socialLinksId
    
    const socialLinks = await SocialLinks.findById(socialLinksId);
    if(!socialLinks){
        return res.status(404).json({message: "SocialLinks not found"})
    }

    res.status(200).json({socialLinks});
})


exports.updateSocialLinks = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    // if (!isAdmin) {
    //     return res.status(403).json({ message: 'Access denied' });
    // }
    const {platform, url} = req.body;
    const socialLinksId = req.params.socialLinksId
    
    const socialLinks = await SocialLinks.findById(socialLinksId);
    if(!socialLinks){
        return res.status(404).json({message: "SocialLinks not found"})
    }

    const updatedSocialLinks = await SocialLinks.findByIdAndUpdate(
                socialLinksId,
                {
                    platform, url
                },
                { new: true }
            );
    await socialLinks.save();
    res.status(200).json({socialLinks});
})



exports.deletSocialLinks = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    // if (!isAdmin) {
    //     return res.status(403).json({ message: 'Access denied' });
    // }
   
    const socialLinksId = req.params.socialLinksId
    
    const socialLinks = await SocialLinks.findByIdAndDelete(socialLinksId);
    if(!socialLinks){
        return res.status(404).json({message: "socialLinks not found"})
    }
    res.status(202).json({message : "socialLinks delete Sucessfully"});
})