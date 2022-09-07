const { Team, Contact } = require("../models");

exports.createContact = (req, res) => {
  Contact
      .create(req.body)
      .then((contact) => {
        res.status(201).json({
          status: "New counterparty contact created",
          contact
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to create new team"
        })
      });
};

exports.delete = (req, res) => {
  Contact
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then((status) => {
        res.status(200).json({
          status: `Contact with id ${req.body.id} was successfully deleted`
        })
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while deleting contact"
        });
      });
};

// exports.update = (req, res) => {
//   Contact
//       .update(req.body.newData, {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then((code) => {
//         res.status(201).json({
//           status: "Contact data successfully edited"
//         })
//       })
//       .catch(error => {
//         res.status(400).send({
//           message: error.message || "Fail to edit existing contact"
//         })
//       });
// };