const authController = require("../controllers/auth.controller.js");
const currentSessionController = require("../controllers/currentSession.controller.js");
const router = require("express").Router();

router.post("/login", authController.logIn);
router.delete("/logout", authController.logOut);
router.get("/current_session", currentSessionController.getCurrentSession);
module.exports = router;