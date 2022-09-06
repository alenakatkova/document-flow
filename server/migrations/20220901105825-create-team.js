"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("team", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      managerName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      assistantName: {
        type: Sequelize.STRING
      },
      assistantEmail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("team");
  }
};