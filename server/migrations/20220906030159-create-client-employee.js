'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClientEmployees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      officePhone: {
        type: Sequelize.STRING
      },
      personalPhone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      job: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      presentIdeas: {
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Client"
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
    await queryInterface.dropTable('ClientEmployees');
  }
};