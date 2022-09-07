const { Agreement } = require("../models");
exports.delete = (req, res) => {
  Agreement
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then((status) => {
        res.status(200).json({
          status: `Agreement with id ${req.body.id} was successfully deleted`
        })
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while deleting Agreement"
        });
      });
};