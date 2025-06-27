const asyncHandler = require('express-async-handler');
const Skills = require('../models/skills')

exports.addSkills = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    const {title, items} = req.body;
 
    const newSkills = await Skills.create({
        title, items
    })
    await newSkills.save();
    res.status(201).json({
        message: "Skills creat Seccessfully"
    })
})


exports.getSkills = asyncHandler(async(req, res) =>{

    const skills = await Skills.find();

    res.status(200).json({skills});
})




exports.updateSkills = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    const {title, items} = req.body;
    const skillId = req.params.skillId
    
    const skills = await Skills.findById(skillId);
    if(!skills){
        return res.status(404).json({message: "Skills not found"})
    }

    const updatedSkills = await Skills.findByIdAndUpdate(
                skillId,
                {
                    title, items
                },
                { new: true }
            );
    await skills.save();
    res.status(200).json({skills});
})



exports.deletSkills = asyncHandler(async(req, res) =>{
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
   
    const skillId = req.params.skillId
    
    const skills = await Skills.findByIdAndDelete(skillId);
    if(!skills){
        return res.status(404).json({message: "Skills not found"})
    }
    res.status(202).json({message : "Skills delete Sucessfully"});
})