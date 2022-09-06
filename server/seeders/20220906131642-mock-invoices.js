'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Invoices", [
      {
        number: "1",
        due: new Date(2022, 1, 5),
        status: "payed",
        agreementId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: "1",
        due: new Date(2022, 11, 30),
        status: "no invoice",
        agreementId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Invoices", null, {});
  }
};
