"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("team", [
      {
        name: "Назаровва И.А.",
        password: "password",
        assistant_name: "Алла Смуглова",
        assistant_email: "nazarova_assistant@example.com",
        junior_name: "Анастасия Иванова",
        junior_email: "nazarova_junior@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Цветочки",
        password: "password",
        assistant_name: "Сергей Петров",
        assistant_email: "cvetochki_assistant@example.com",
        junior_name: "Петр Сергеев",
        junior_email: "cvetochki_junior@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("team", null, {});
  }
};
