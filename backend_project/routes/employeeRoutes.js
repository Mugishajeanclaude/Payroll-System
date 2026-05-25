const express = require("express");
const router = express.Router();
const Controller = require("../controllers/employeeController");

router.post('/create', Controller.createEmployee);
router.get('/read', Controller.getemployees);

module.exports = router;