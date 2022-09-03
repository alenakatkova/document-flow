const { Team } = require("../models");

exports.findAll = (req, res) => {
  Team
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving teams"
        });
      });
};

exports.create = (req, res) => {
  Team
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "New team created",
          newUserId: user.id
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to create new team"
        })
      });
};

exports.delete = (req, res) => {
  Team
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then((status) => {
        res.status(200).json({
          status: `Team with id ${req.body.id} was successfully deleted`
        })
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while deleting team"
        });
      });
};

exports.update = (req, res) => {
  console.log("why am i in update")
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
