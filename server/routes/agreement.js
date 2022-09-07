const agreementController = require("../controllers/agreement.controller.js");
const router = require("express").Router();

router.delete("/:id", agreementController.delete);

module.exports = router;