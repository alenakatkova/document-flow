const { AgreementTransaction } = require("../models");

exports.findAll = (req, res) => {
  AgreementTransaction
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving agreement transactions"
        });
      });
};

exports.create = (req, res) => {
  AgreementTransaction
      .create(req.body)
      .then((transaction) => {
        res.status(201).json({
          status: "New transaction created",
          transaction
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to create new transaction"
        })
      });
};