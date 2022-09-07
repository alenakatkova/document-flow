const contactController = require("../controllers/contact.controller.js");
const router = require("express").Router();

router.delete("/:id", contactController.delete);

module.exports = router;