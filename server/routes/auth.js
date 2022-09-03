const authController = require("../controllers/auth.controller.js");
const router = require("express").Router();

router.post("/login", authController.logIn);
router.delete("/logout", authController.logOut);

module.exports = router;