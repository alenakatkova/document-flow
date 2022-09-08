const {
  Contract,
  ContractTransaction,
  DocumentStatus,
  Agreement, Counterparty, Contact, Invoice, AgreementTransaction,
} = require("../models");

exports.retrieveAllDataForContract = (req, res) => {
  Contract
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: ContractTransaction,
            include: [
              {
                model: DocumentStatus,
              }
            ]
          },
          {
            model: Agreement,
            attributes: ["id", "number"]
          }
        ]
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || `Some error occurred while retrieving clients of contract with id ${req.body.teamId}`
        });
      });
};

exports.findAllDocumentsByCounterpartyId = (req, res) => {
  console.log(req.body)
  Contract
      .findAll({
        where: {
          counterpartyId: req.body.counterpartyId
        },
        attributes: ["id", "number"],
        include: [
          {
            model: Agreement,
            attributes: ["id", "number"],
            include: [
              {
                model: Invoice,
                attributes: ["id", "number"]
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
          message: error.message || `Some error occurred while retrieving documents of contractor with id ${req.body.counterpartyId}`
        });
      });
};