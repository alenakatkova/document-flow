const clientController = require("../controllers/counterparty.controller.js");
const router = require("express").Router();

router.post("/", clientController.findAllByTeamId);
router.post("/:id/add-contract", clientController.createContract);
// router.post("/signup", teamController.create);
// router.delete("/:id", teamController.delete);
// router.post("/:id", teamController.update);

module.exports = router;