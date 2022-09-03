const teamController = require("../controllers/team.controller.js");
const router = require("express").Router();

router.get("/", teamController.findAll);
router.post("/signup", teamController.create);
router.delete("/:id", teamController.delete);
router.post("/:id", teamController.update);

module.exports = router;