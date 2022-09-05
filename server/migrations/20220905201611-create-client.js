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
      fullName: {
        type: Sequelize.STRING
      },
      shortName: {
        type: Sequelize.STRING
      },
      businessAddress: {
        type: Sequelize.STRING
      },
      postalAddress: {
        type: Sequelize.STRING
      },
      inn: {
        type: Sequelize.STRING
      },
      kpp: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.STRING
      },
      corrAccount: {
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