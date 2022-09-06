const { Counterparty } = require("../models");
const { Contract } = require("../models")
const { Agreement } = require("../models")
const { Invoice } = require("../models")
const { AgreementTransaction } = require("../models")
const { Contact } = require("../models")
const { ContractTransaction } = require("../models")
const { DocumentStatus } = require("../models")
const { InternalDepartment } = require("../models")
const { InternalContact } = require("../models")

exports.findAllByTeamId = (req, res) => {
  Counterparty
      .findAll({
        where: {
          teamId: req.body.teamId
        },
        attributes: ["id", "name", "isPriority", "phone"],
        include: [
          {
            model: Contact,
            attributes: ["name", "phone", "email", "job"]
          },
          {
            model: Contract,
            attributes: ["id", "number"],
            include: [
              {
                model: ContractTransaction,
                order: [["createdAt", "DESC"]],
                attributes: ["createdAt"],
                include: [
                  {
                    model: DocumentStatus,
                    attributes: ["stage"]
                  }
                ]
              },
              {
                model: Agreement,
                attributes: ["id", "number"],
                include: [
                  {
                    model: Invoice,
                    attributes: ["id", "number"],
                  },
                  {
                    model: AgreementTransaction,
                    order: [["createdAt", "DESC"]],
                    attributes: ["id", "createdAt"],
                    include: [
                      {
                        model: DocumentStatus,
                        attributes: ["id", "stage"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || `Some error occurred while retrieving clients of team with id ${req.body.teamId}`
        });
      });
};

exports.retrieveAllDataForCounterparty = (req, res) => {
  console.log(req);
  Counterparty
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Contact,
            attributes: ["name", "phone", "email", "job"]
          },
          {
            model: Contract,
            attributes: ["id", "number"],
            include: [
              {
                model: ContractTransaction,
                order: [["createdAt", "DESC"]],
                attributes: ["createdAt"],
                include: [
                  {
                    model: DocumentStatus,
                    attributes: ["stage"]
                  }
                ]
              },
              {
                model: Agreement,
                attributes: ["id", "number"],
                include: [
                  {
                    model: Invoice,
                    attributes: ["id", "number"],
                  },
                  {
                    model: AgreementTransaction,
                    order: [["createdAt", "DESC"]],
                    attributes: ["id", "createdAt"],
                    include: [
                      {
                        model: DocumentStatus,
                        attributes: ["id", "stage"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
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
