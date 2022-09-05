"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clientContract", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      signedVersion: {
        type: Sequelize.BLOB
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "client"
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
    await queryInterface.dropTable("clientContract");
  }
};