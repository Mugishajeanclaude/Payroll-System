const Department = require("../models/departmentSchema");

exports.createDepartment = async(req,res) => {
    try{
        const department = await Department.create(req.body);
        res.status(201).json(department);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getDepartments = async (req,res) => {
    try{
        const departments = await Department.find();
        res.status(200).json(departments);
    }
    catch(err){
        res.status(500).json(err)
    }
}