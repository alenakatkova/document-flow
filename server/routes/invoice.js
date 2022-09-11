const invoiceController = require("../controllers/invoice.controller.js");
const agreementController = require("../controllers/agreement.controller");
const router = require("express").Router();

router.post("/add-invoice", invoiceController.create);
router.post("/:id/update", invoiceController.update);

module.exports = router;