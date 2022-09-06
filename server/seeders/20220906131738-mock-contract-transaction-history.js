'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ContractTransactions", [
      {
        "comment": "полностью переписан раздел 2",
        "documentStatusId": 1,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "п.1.1.2 перенесен в доп соглашение",
        "documentStatusId": 2,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "изменились реквизиты контрагента",
        "documentStatusId": 3,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "",
        "documentStatusId": 4,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "полностью переписан раздел 5",
        "documentStatusId": 5,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "п.1.1.2 перенесен в доп соглашение",
        "documentStatusId": 6,
        "contractId": 1
      },
      {
        "comment": "",
        "documentStatusId": 7,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 8,
        "contractId": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "comment": "",
        "documentStatusId": 1,
        "contractId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "comment": "пункт 1.2.7 убрали",
        "documentStatusId": 2,
        "contractId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "comment": "ничего не меняли",
        "documentStatusId": 3,
        "contractId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "comment": "добавили пункт 1.2.4",
        "documentStatusId": 4,
        "contractId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "comment": "пункт 1.2.5 убрали",
        "documentStatusId": 5,
        "contractId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ContractTransactions", null, {});
  }
};
