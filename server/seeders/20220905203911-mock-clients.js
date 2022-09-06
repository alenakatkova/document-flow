"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Client", [
      {
        name: "«Банк «Оренбург»",
        isPriority: false,
        officeAddress: "195112, Оренбург, ул. Ветеранов, д.1",
        bankDetails: "",
        phone: "+7-800-345-22-33",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "«Банк «Саратов»",
        isPriority: false,
        officeAddress: "195112, Саратов, ул. Ветеранов, д.1",
        bankDetails: "",
        phone: "+7-800-345-22-33",
        teamId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Client", null, {});
  }
};
