const agreementController = require("../controllers/agreement.controller.js");
const router = require("express").Router();

router.get("/:id", agreementController.retrieveAllDataForAgreement);
router.post("/add-agreement", agreementController.create);

module.exports = router;