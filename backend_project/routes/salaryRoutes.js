const express = require("express");
const router = express.Router();
const Controller = require("../controllers/salaryController");

router.post('/create', Controller.addSalary);
router.get('/read', Controller.getSalaries);
router.put('/update/:id', Controller.updateSalary);
router.delete('/delete/:id', Controller.deleteSalary);
router.get('/report', Controller.monthlyReport);

module.exports = router;