const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const db = require('./config/db');
db()
const aboutRouter = require('./Router/aboutRouter');
const educationRouter = require('./Router/educationRouter');
const projectRouter = require('./Router/projectRouter')
const skillsRouter = require('./Router/skillsRouter')
const socialLinksRouter = require('./Router/socialLinksRouter');
const authRouter = require('./Router/authRouter')
const contactRouter =require('./Router/contactRouter')
app.use('/api/v1/about', aboutRouter);
app.use('/api/v1/education', educationRouter)
app.use('/api/v1/project', projectRouter)
app.use('/api/v1/skill', skillsRouter)
app.use('/api/v1/social-links', socialLinksRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', contactRouter)

app.listen(3000, ()=>{
    console.log(`app running in port 3000`)
});
