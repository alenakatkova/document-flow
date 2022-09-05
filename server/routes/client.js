const clientController = require("../controllers/client.controller.js");
const router = require("express").Router();

router.post("/", clientController.findAllByTeamId);
// router.post("/signup", teamController.create);
// router.delete("/:id", teamController.delete);
// router.post("/:id", teamController.update);

module.exports = router;