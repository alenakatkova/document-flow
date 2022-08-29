const users = require("../controllers/user.controller.js");
const router = require("express").Router();

router.get("/", users.findAll);
router.post("/signup", users.create);
router.delete("/:id", users.delete);
router.post("/:id", users.update);

module.exports = router;