const invoiceController = require("../controllers/invoice.controller.js");
const router = require("express").Router();

router.post("/add", invoiceController.create);
router.post("/:id/update", invoiceController.update);

module.exports = router;