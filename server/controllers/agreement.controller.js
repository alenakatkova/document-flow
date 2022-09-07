const {
  AgreementTransaction,
  DocumentStatus,
  Agreement,
  InternalDepartment,
  InternalContacts,
  Invoice
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