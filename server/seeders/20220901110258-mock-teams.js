"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("team", [
      {
        name: "Назаровва И.А.",
        password: "password",
        main_contact: "nazarova_assistant@example.com",
        additional_contact: "nazarova_junior@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Цветочки",
        password: "password",
        main_contact: "cvetochki_assistant@example.com",
        additional_contact: "cvetochki_junior@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("team", null, {});
  }
};
