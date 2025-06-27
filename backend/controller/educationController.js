const asyncHandler = require('express-async-handler');
const Education = require('../models/education')

exports.addEducation = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    // if (!isAdmin) {
    //     return res.status(403).json({ message: 'Access denied' });
    // }
    const {educationName, program, startDate, endDate,description } = req.body;

    const newEducation = await Education.create({
        educationName, program, startDate, endDate,description 
    })
    await newEducation.save();
    res.status(201).json({
        message: "Education creat Seccessfully"
    })
})

exports.getEducation = asyncHandler(async(req, res) =>{
    const education = await Education.find();

    res.status(200).json({education});
})

exports.getAboutById = asyncHandler(async(req, res) =>{
    const educationId = req.params.educationId
    
    const education = await Education.findById(educationId);
    if(!education){
        return res.status(404).json({message: "education not found"})
    }

    res.status(200).json({education});
})


exports.updateEducation = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    // if (!isAdmin) {
    //     return res.status(403).json({ message: 'Access denied' });
    // }
    const {educationName, program, startDate, endDate,description } = req.body;
    const educationId = req.params.educationId
    
    const education = await Education.findById(educationId);
    if(!education){
        return res.status(404).json({message: "Education not found"})
    }

    const updatedEducation = await Education.findByIdAndUpdate(
                educationId,
                {
                   educationName, program, startDate, endDate,description
                },
                { new: true }
            );
    await education.save();
    res.status(200).json({updatedEducation});
})



exports.deletEducation = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    // if (!isAdmin) {
    //     return res.status(403).json({ message: 'Access denied' });
    // }
   
    const educationId = req.params.educationId
    
    const education = await Education.findByIdAndDelete(educationId);
    if(!education){
        return res.status(404).json({message: "Education not found"})
    }
    res.status(202).json({message : "Education delete Sucessfully"});
})