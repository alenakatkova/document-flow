const contractController = require("../controllers/contract.controller.js");
const router = require("express").Router();

router.get("/:id", contractController.retrieveAllDataForContract);
router.post("/add-contract", contractController.create);
module.exports = router;