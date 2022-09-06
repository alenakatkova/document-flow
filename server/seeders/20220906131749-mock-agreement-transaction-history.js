'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("AgreementTransactions", [
      {
        "comment": "ничего не меняли",
        "documentStatusId": 1,
        "agreementId": 1,
        "createdAt": "2022-04-01T21:00:00.000Z",
        "updatedAt": "2022-04-01T21:00:00.000Z"
      },
      {
        "comment": "изменились реквизиты контрагента",
        "documentStatusId": 1,
        "agreementId": 2,
        "createdAt": "2022-04-01T21:00:00.000Z",
        "updatedAt": "2022-04-01T21:00:00.000Z"
      },
      {
        "comment": "",
        "documentStatusId": 2,
        "agreementId": 1,
        "createdAt": "2022-04-02T21:00:00.000Z",
        "updatedAt": "2022-04-02T21:00:00.000Z"
      },
      {
        "comment": "добавили пункт 1.2.7",
        "documentStatusId": 2,
        "agreementId": 2,
        "createdAt": "2022-04-02T21:00:00.000Z",
        "updatedAt": "2022-04-02T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 3,
        "agreementId": 1,
        "createdAt": "2022-04-03T21:00:00.000Z",
        "updatedAt": "2022-04-03T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 3,
        "agreementId": 2,
        "createdAt": "2022-04-03T21:00:00.000Z",
        "updatedAt": "2022-04-03T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 4,
        "agreementId": 1,
        "createdAt": "2022-04-04T21:00:00.000Z",
        "updatedAt": "2022-04-04T21:00:00.000Z"
      },
      {
        "comment": "пункт 1.2.4 убрали",
        "documentStatusId": 5,
        "agreementId": 1,
        "createdAt": "2022-04-05T21:00:00.000Z",
        "updatedAt": "2022-04-05T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 6,
        "agreementId": 1,
        "createdAt": "2022-04-06T21:00:00.000Z",
        "updatedAt": "2022-04-06T21:00:00.000Z"
      },
      {
        "comment": "",
        "documentStatusId": 7,
        "agreementId": 1,
        "createdAt": "2022-04-07T21:00:00.000Z",
        "updatedAt": "2022-04-07T21:00:00.000Z"
      },
      {
        "comment": "добавили пункт 1.2.7",
        "documentStatusId": 8,
        "agreementId": 1,
        "createdAt": "2022-04-08T21:00:00.000Z",
        "updatedAt": "2022-04-08T21:00:00.000Z"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("AgreementTransactions", null, {});
  }
};
