"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Teams", [
      {
        username: "nazarova",
        managerName: "Назарова И.А.",
        password: "password",
        assistantName: "Алла Смуглова",
        assistantEmail: "smuglovaa@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "andreev",
        managerName: "Андреев П.П.",
        password: "password",
        assistantName: "Сергей Петров",
        assistantEmail: "petrovs@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Teams", null, {});
  }
};
