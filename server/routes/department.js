const departmentController = require("../controllers/departments.controller.js");
const router = require("express").Router();

router.get("/", departmentController.findAll);

module.exports = router;