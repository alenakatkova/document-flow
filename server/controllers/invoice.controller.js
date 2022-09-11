const { Invoice, Agreement } = require("../models");
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

exports.update = (req, res) => {
  Invoice
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        res.status(201).json({
          status: "Invoice data successfully edited"
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to edit existing Invoice"
        })
      });
};