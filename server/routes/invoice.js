const invoiceController = require("../controllers/invoice.controller.js");
const router = require("express").Router();

router.post("/add-invoice", invoiceController.create);

module.exports = router;