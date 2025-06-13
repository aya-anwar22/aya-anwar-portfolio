const asyncHandler = require('express-async-handler');
const Project = require('../models/project')
const cloudinary = require('../config/cloudinary');

exports.addProject = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    const {title, description, techStack, githubLink,liveDemo} = req.body;
    const image = req.file.path;
    const newProject = await Project.create({
        title, description, techStack, githubLink,liveDemo, image
    })
    await newProject.save();
    res.status(201).json({
        message: "Project creat Seccessfully"
    })
})


exports.getProject = asyncHandler(async(req, res) =>{
    const project = await Project.find();

    res.status(200).json({project});
})

exports.getProjectById = asyncHandler(async(req, res) =>{
    const projectId = req.params.projectId
    
    const project = await Project.findById(projectId);
    if(!project){
        return res.status(404).json({message: "Project not found"})
    }

    res.status(200).json({project});
})


exports.updateProject = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    const {title, description, techStack, githubLink,liveDemo}  = req.body;
    const projectId = req.params.projectId
    const image = req.file ? req.file.path : req.body.image;


    const project = await Project.findById(projectId);
    if(!project){
        return res.status(404).json({message: "project not found"})
    }

title, description, techStack, githubLink,liveDemo, image
    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = techStack || project.techStack;
    project.githubLink = githubLink || project.githubLink;
    project.liveDemo = liveDemo || project.liveDemo;
    project.image = image || project.image;
    await project.save();
    res.status(200).json({project});
})



exports.deletProject = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
   
    const projectId = req.params.projectId
    
    const project = await Project.findByIdAndDelete(projectId);
    if(!project){
        return res.status(404).json({message: "Project not found"})
    }
    res.status(202).json({message : "Project delete Sucessfully"});
})