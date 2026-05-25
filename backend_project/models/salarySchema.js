const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
    employeeNumber:  {type: mongoose.Schema.Types.ObjectId, ref:'employee', required: true},
    grossSalary:  {type: Number, required: true},
    totalDeduction:  {type: Number, required: true},
    netSalary:  {type: Number, required: true},
    month:  {type: String, required: true}
});

module.exports = mongoose.model('salary', salarySchema);