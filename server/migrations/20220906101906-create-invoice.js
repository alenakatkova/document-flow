'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      due: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      linkToFile: {
        type: Sequelize.STRING
      },
      agreementId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Agreements',
          },
          key: 'id'
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
    await queryInterface.dropTable('Invoices');
  }
};