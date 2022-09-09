const agreementTransactionController = require("../controllers/agreementTransaction.controller");
const router = require("express").Router();

router.get("/", agreementTransactionController.findAll);
router.post("/add-transaction", agreementTransactionController.create);

module.exports = router;