const Salary = require("../models/salarySchema");

exports.addSalary = async(req,res) => {
    try{
        const {employeeNumber, grossSalary, totalDeduction, month} = (req.body);
        const netSalary = grossSalary - totalDeduction;
        const salary = await Salary.create({employeeNumber, grossSalary, totalDeduction, netSalary, month})
        res.status(201).json(salary);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getSalaries = async (req,res) => {
    try{
        const salaries = await Salary.find().populate('employeeNumber');
        res.status(200).json(salaries);
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.updateSalary = async(req,res) => {
    try{
        const {grossSalary, totalDeduction, month} = req.body;
        const netSalary = grossSalary - totalDeduction;
        const salary = await Salary.findByIdAndUpdate(req.params.id, {grossSalary, totalDeduction, netSalary, month});
        res.status(200).json(salary);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.deleteSalary = async(req,res) => {
    try{
        await Salary.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Salary Deleted!"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.monthlyReport = async(req,res) => {
    try{
        const report = await Salary.find().populate({path: 'employeeNumber', populate: {path: 'departmentCode'}});
        res.status(200).json(report);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}