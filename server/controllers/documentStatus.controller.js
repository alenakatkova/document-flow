const { DocumentStatus } = require("../models");

exports.findAll = (req, res) => {
  DocumentStatus
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving document statuses"
        });
      });
};