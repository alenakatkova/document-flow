const { User } = require("../models");

exports.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data)
  })
    .catch(err => {
            res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    })
};