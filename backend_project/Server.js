const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 4400;
const conn = require("./conf/db");

const app = express();

app.use(cors());
app.use(express.json());

const departmentRoute = require("./routes/departmentRoutes");
const employeeRoute = require("./routes/employeeRoutes");
const salaryRoute = require("./routes/salaryRoutes");

conn();

app.use('/api/department', departmentRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/salary', salaryRoute);

app.listen(PORT, () => {
    console.log(`Server is listening port: ${PORT}`);
})