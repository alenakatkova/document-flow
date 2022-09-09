const { DocumentStatus, InternalDepartment } = require("../models");

exports.findAll = (req, res) => {
  DocumentStatus
      .findAll({
        include: [
          {
            model: InternalDepartment
          }
        ]
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving document statuses"
        });
      });
};