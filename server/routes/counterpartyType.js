const counterpartyTypeController = require("../controllers/counterpartyType.controller");
const router = require("express").Router();

router.get("/", counterpartyTypeController.findAll);

module.exports = router;