const db = require("../models");

const UserController = db.users;

exports.findAll = (req, res) => {
  UserController.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};