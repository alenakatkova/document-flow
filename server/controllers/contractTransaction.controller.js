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

exports.delete = (req, res) => {
  console.log(req.body)
  // Team
  //     .destroy({
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then((status) => {
  //       res.status(200).json({
  //         status: `Team with id ${req.body.id} was successfully deleted`
  //       })
  //     })
  //     .catch(error => {
  //       res.status(500).send({
  //         message: error.message || "Some error occurred while deleting team"
  //       });
  //     });
};

exports.update = (req, res) => {
  Team
      .update(req.body.newData, {
        where: {
          id: req.body.id
        }
      })
      .then((code) => {
        res.status(201).json({
          status: "Team data successfully edited"
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to edit existing team"
        })
      });
};
