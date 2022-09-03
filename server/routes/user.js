const users = require("../controllers/user.controller.js");
const router = require("express").Router();
const requireAuth = require("../middleware/auth");

router.route("/").get(users.findAll);
router.post("/signup", users.create);
router.delete("/:id", users.delete);
router.post("/:id", users.update);

module.exports = router;