const counterpartyController = require("../controllers/counterparty.controller.js");
const contactController = require("../controllers/contact.controller.js");
const router = require("express").Router();

router.post("/", counterpartyController.findAllByTeamId);
router.post("/:id/add-contract", counterpartyController.createContract);
router.post("/:id/add-contact", contactController.createContact);
router.get("/:id", counterpartyController.retrieveAllDataForCounterparty);

//router.delete("/:id", contactController.delete);


// router.post("/signup", teamController.create);
// router.delete("/:id", teamController.delete);
// router.post("/:id", teamController.update);

module.exports = router;