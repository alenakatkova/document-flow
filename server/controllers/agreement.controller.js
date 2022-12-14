const {
  AgreementTransaction,
  DocumentStatus,
  Agreement,
  InternalDepartment,
  Invoice,
  Contract,
  Counterparty
} = require("../models");

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

exports.retrieveAllDataForAgreement = (req, res) => {
  Agreement
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Contract,
            include: [
              {
                model: Counterparty
              }
            ]
          },
          {
            model: AgreementTransaction,
            include: [
              {
                model: DocumentStatus,
                include: [
                  {
                    model: InternalDepartment
                  }
                ]
              }
            ]
          },
          {
            model: Invoice
          }
        ]
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || `Some error occurred while retrieving clients of agreement with id ${req.body.teamId}`
        });
      });
};

exports.create = (req, res) => {
  console.log(req.body)
  Agreement
      .create(req.body)
      .then((agreement) => {
        res.status(201).json({
          status: "New Agreement created",
          agreement
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to create new Agreement"
        })
      });
};

exports.update = (req, res) => {
  Agreement
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        res.status(201).json({
          status: "Agreement data successfully edited"
        })
      })
      .catch(error => {
        res.status(400).send({
          message: error.message || "Fail to edit existing Agreement"
        })
      });
};