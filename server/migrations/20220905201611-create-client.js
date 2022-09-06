"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("client", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      isPriority: {
        type: Sequelize.BOOLEAN
      },
      bankDetails: {
        type: Sequelize.STRING
      },
      officeAddress: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "team"
          },
          key: "id"
        }
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
    await queryInterface.dropTable("client");
  }
};