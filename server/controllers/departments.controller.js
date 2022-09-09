const { InternalDepartment, InternalContact } = require("../models");

exports.findAll = (req, res) => {
  InternalDepartment
      .findAll({
        include: [
          {
            model: InternalContact
          }
        ]
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving teams"
        });
      });
};