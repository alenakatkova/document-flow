const contractController = require("../controllers/contract.controller.js");
const router = require("express").Router();

router.get("/:id", contractController.retrieveAllDataForContract);

module.exports = router;