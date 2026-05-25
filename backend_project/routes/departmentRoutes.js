const express = require("express");
const router = express.Router();
const Controller = require("../controllers/departmentController");

router.post('/create', Controller.createDepartment);
router.get('/read', Controller.getDepartments);

module.exports = router;