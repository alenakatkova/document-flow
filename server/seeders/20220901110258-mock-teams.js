"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("team", [
      {
        name: "Назаровва И.А.",
        password: "password",
        assistantName: "Алла Смуглова",
        assistantEmail: "nazarova_assistant@example.com",
        juniorName: "Анастасия Иванова",
        juniorEmail: "nazarova_junior@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Цветочки",
        password: "password",
        assistantName: "Сергей Петров",
        assistantEmail: "cvetochki_assistant@example.com",
        juniorName: "Петр Сергеев",
        juniorEmail: "cvetochki_junior@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("team", null, {});
  }
};
