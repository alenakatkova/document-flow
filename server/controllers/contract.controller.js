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
          },
          {
            model: Counterparty,
            attributes: ["id", "name"]
          },
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

exports.create = (req, res) => {
  console.log(req.body)
  Contract
      .create(req.body)
      .then((contract) => {
        res.status(201).json({
          status: "New contract created",
          contract
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to create new contract"
        })
      });
};

exports.update = (req, res) => {
  Contract
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        res.status(201).json({
          status: "User data successfully edited"
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to edit existing user"
        })
      });
};