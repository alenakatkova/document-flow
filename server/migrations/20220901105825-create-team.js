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
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      assistant_name: {
        type: Sequelize.STRING
      },
      assistant_email: {
        type: Sequelize.STRING
      },
      junior_name: {
        type: Sequelize.STRING
      },
      junior_email: {
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