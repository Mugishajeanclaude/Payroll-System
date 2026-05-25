const Employee = require("../models/employeeSchema");

exports.createEmployee = async(req,res) => {
    try{
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getemployees = async (req,res) => {
    try{
        const employees = await Employee.find().populate('departmentCode');
        res.status(200).json(employees);
    }
    catch(err){
        res.status(500).json(err)
    }
}