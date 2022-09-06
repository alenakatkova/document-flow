const { Client } = require("../models");
const { ClientContract } = require("../models");

exports.findAllByTeamId = (req, res) => {
  Client
      .findAll({
        where: {
          teamId: req.body.teamId
        }
      })
      .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || `Some error occurred while retrieving clients of team with id ${req.body.teamId}`
        });
      });
};

exports.createContract = (req, res) => {
  console.log(req.body)
  console.log(req)
  // ClientContract
  //     .create(req.body)
  //     .then((team) => {
  //       req.session.teamId = team.id;
  //       console.log(req.session)
  //       console.log(team.id)
  //       console.log(req.session.id)
  //
  //       res.status(201).json({
  //         status: "New team created",
  //         team
  //       })
  //     })
  //     .catch(error => {
  //       res.status(400).send({
  //         message: error.message || "Fail to create new team"
  //       })
  //     });
};

// exports.create = (req, res) => {
//   Team
//       .create(req.body)
//       .then((team) => {
//         req.session.teamId = team.id;
//         console.log(req.session)
//         console.log(team.id)
//         console.log(req.session.id)
//
//         res.status(201).json({
//           status: "New team created",
//           team
//         })
//       })
//       .catch(error => {
//         res.status(400).send({
//           message: error.message || "Fail to create new team"
//         })
//       });
// };
//
// exports.delete = (req, res) => {
//   Team
//       .destroy({
//         where: {
//           id: req.body.id
//         }
//       })
//       .then((status) => {
//         res.status(200).json({
//           status: `Team with id ${req.body.id} was successfully deleted`
//         })
//       })
//       .catch(error => {
//         res.status(500).send({
//           message: error.message || "Some error occurred while deleting team"
//         });
//       });
// };
//
// exports.update = (req, res) => {
//   console.log("why am i in update")
//   Team
//       .update(req.body.newData, {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then((code) => {
//         res.status(201).json({
//           status: "Team data successfully edited"
//         })
//       })
//       .catch(error => {
//         res.status(400).send({
//           message: error.message || "Fail to edit existing team"
//         })
//       });
// };
