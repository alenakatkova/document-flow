'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Agreements", [
      {
        number: "1",
        signDate: new Date(2022, 1, 5),
        contractId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: "2",
        signDate: undefined,
        contractId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Agreements", null, {});
  }
};
