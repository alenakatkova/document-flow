'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Contracts", [
      {
        number: "2Н",
        startDate: new Date(2021, 11, 1),
        endDate: new Date(2022, 10, 30),
        linkToFileOnDisk: "https://drive.google.com/drive/u/0/my-drive",
        signDate: new Date(2021, 11, 1),
        counterpartyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: "156",
        startDate: new Date(2022, 10, 30),
        endDate: new Date(2024, 11, 31),
        linkToFileOnDisk: "https://drive.google.com/drive/u/0/my-drive",
        signDate: "",
        counterpartyId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Contracts", null, {});
  }
};
