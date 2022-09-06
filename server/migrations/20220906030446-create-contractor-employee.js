'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContractorEmployees', {
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
      contractorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Contractor"
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
    await queryInterface.dropTable('ContractorEmployees');
  }
};