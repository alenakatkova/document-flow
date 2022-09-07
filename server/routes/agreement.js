const agreementController = require("../controllers/agreement.controller.js");
const router = require("express").Router();

router.get("/:id", agreementController.retrieveAllDataForAgreement);

module.exports = router;