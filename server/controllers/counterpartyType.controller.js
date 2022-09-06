const { CounterpartyType } = require("../models");

exports.findAll = (req, res) => {
  CounterpartyType
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving types of counterparties"
        });
      });
};