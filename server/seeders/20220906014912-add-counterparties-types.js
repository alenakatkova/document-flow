'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("counterpartyType", [
      {
        type: "Клиент"
      },
      {
        type: "Подрядчик"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("counterpartyType", null, {});
  }
};
