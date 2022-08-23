const { User } = require("../models");

exports.findAll = (req, res) => {
  User
      .findAll()
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      })
};

exports.create = (req, res) => {
  User
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "user created",
          newUserId: user.id
        })
      })
      .catch(e =>{
        res.status(400).json({
          status: "fail to create new user"
        })
      });
}