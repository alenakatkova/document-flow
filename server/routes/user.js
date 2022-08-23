const users = require("../controllers/user.controller.js");
const router = require("express").Router();

router.get("/", users.findAll);
router.post("/signup", users.create);

module.exports = router;