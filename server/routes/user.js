const users = require("../controllers/user.controller.js");
const router = require("express").Router();
router.get("/", users.findAll);

module.exports = router;