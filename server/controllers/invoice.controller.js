const { Invoice } = require("../models");
exports.create = (req, res) => {
  console.log(req.body)
  Invoice
      .create(req.body)
      .then((invoice) => {
        res.status(201).json({
          status: "New invoice created",
          invoice
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to create new invoice"
        })
      });
};