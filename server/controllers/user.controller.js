const { User } = require("../models");

exports.findAll = (req, res) => {
  User
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving users"
        });
      });
};

exports.create = (req, res) => {
  User
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "New user created",
          newUserId: user.id
        })
      })
      .catch(error =>{
        res.status(400).send({
          message: error.message || "Fail to create new user"
        })
      });
};

exports.delete = (req, res) => {
  User
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then((status) => {
        res.status(200).json({
          status: `User with id ${req.body.id} was successfully deleted`
        })
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while deleting user"
        });
      });
};

exports.update = (req, res) => {
  User
      .update(req.body.newData, {
        where: {
          id: req.body.id
        }
      })
      .then((user) => {
        res.status(201).json({
          status: "User data successfully edited"
        })
      })
      .catch(error =>{
        res.status(400).send({
          message: error.message || "Fail to edit existing user"
        })
      });
};

