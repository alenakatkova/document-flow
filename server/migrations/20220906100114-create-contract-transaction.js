'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContractTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      documentStatusId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'DocumentStatuses',
          },
          key: 'id'
        }
      },
      contractId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Contracts',
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
    await queryInterface.dropTable('ContractTransactions');
  }
};