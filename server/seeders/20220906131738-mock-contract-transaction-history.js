'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ContractTransactions", [
      {
        "comment": "ничего не меняли",
        "documentStatusId": 1,
        "contractId": 1,
        "createdAt": "2022-04-01T21:00:00.000Z",
        "updatedAt": "2022-04-01T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 1,
        "contractId": 2,
        "createdAt": "2022-04-01T21:00:00.000Z",
        "updatedAt": "2022-04-01T21:00:00.000Z"
      },
      {
        "comment": "добавили пункт 1.2.10",
        "documentStatusId": 2,
        "contractId": 1,
        "createdAt": "2022-04-02T21:00:00.000Z",
        "updatedAt": "2022-04-02T21:00:00.000Z"
      },
      {
        "comment": "пункт 1.2.1 убрали",
        "documentStatusId": 2,
        "contractId": 2,
        "createdAt": "2022-04-02T21:00:00.000Z",
        "updatedAt": "2022-04-02T21:00:00.000Z"
      },
      {
        "comment": "изменились реквизиты контрагента",
        "documentStatusId": 3,
        "contractId": 1,
        "createdAt": "2022-04-03T21:00:00.000Z",
        "updatedAt": "2022-04-03T21:00:00.000Z"
      },
      {
        "comment": "добавили пункт 1.2.6",
        "documentStatusId": 3,
        "contractId": 2,
        "createdAt": "2022-04-03T21:00:00.000Z",
        "updatedAt": "2022-04-03T21:00:00.000Z"
      },
      {
        "comment": "изменились реквизиты контрагента",
        "documentStatusId": 4,
        "contractId": 1,
        "createdAt": "2022-04-04T21:00:00.000Z",
        "updatedAt": "2022-04-04T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 4,
        "contractId": 2,
        "createdAt": "2022-04-04T21:00:00.000Z",
        "updatedAt": "2022-04-04T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 5,
        "contractId": 1,
        "createdAt": "2022-04-05T21:00:00.000Z",
        "updatedAt": "2022-04-05T21:00:00.000Z"
      },
      {
        "comment": "добавили пункт 1.2.6",
        "documentStatusId": 5,
        "contractId": 2,
        "createdAt": "2022-04-05T21:00:00.000Z",
        "updatedAt": "2022-04-05T21:00:00.000Z"
      },
      {
        "comment": "",
        "documentStatusId": 6,
        "contractId": 1,
        "createdAt": "2022-04-06T21:00:00.000Z",
        "updatedAt": "2022-04-06T21:00:00.000Z"
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 7,
        "contractId": 1,
        "createdAt": "2022-04-07T21:00:00.000Z",
        "updatedAt": "2022-04-07T21:00:00.000Z"
      },
      {
        "comment": "добавили пункт 1.2.9",
        "documentStatusId": 8,
        "contractId": 1,
        "createdAt": "2022-04-08T21:00:00.000Z",
        "updatedAt": "2022-04-08T21:00:00.000Z"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ContractTransactions", null, {});
  }
};
