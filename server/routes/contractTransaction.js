const contractTransactionController = require("../controllers/contractTransaction.controller");
const router = require("express").Router();

router.get("/", contractTransactionController.findAll);
router.post("/add-transaction", contractTransactionController.create);

module.exports = router;