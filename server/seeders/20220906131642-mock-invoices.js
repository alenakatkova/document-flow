'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Invoices", [
      {
        number: "1",
        due: new Date(2022, 1, 5),
        status: "Оплачен",
        agreementId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: "1",
        due: new Date(2022, 11, 30),
        status: "Не выставлен",
        agreementId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: "1",
        due: new Date(2021, 11, 30),
        status: "Требуется оплата",
        agreementId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Invoices", null, {});
  }
};
