const { ContractTransaction } = require("../models");

exports.findAll = (req, res) => {
  ContractTransaction
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving contract transactions"
        });
      });
};

exports.create = (req, res) => {
  ContractTransaction
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

