const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeNumber:  {type: String, required: true, unique:true},
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    position:  {type: String, required: true},
    address:  {type: String, required: true},
    telephone:  {type: String, required: true},
    gender:  {type: String, required: true},
    hiredDate:  {type: String, required: true},
    departmentCode: {type: mongoose.Schema.Types.ObjectId, ref:'department', required: true}
},{timestamps: true});

module.exports = mongoose.model('employee', employeeSchema);