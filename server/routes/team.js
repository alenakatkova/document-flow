const teams = require("../controllers/team.controller.js");
const router = require("express").Router();

router.get("/", teams.findAll);
router.post("/signup", teams.create);
router.delete("/:id", teams.delete);
router.post("/:id", teams.update);

module.exports = router;