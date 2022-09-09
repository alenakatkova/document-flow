const documentStatusController = require("../controllers/documentStatus.controller.js");
const router = require("express").Router();

router.get("/", documentStatusController.findAll);

module.exports = router;