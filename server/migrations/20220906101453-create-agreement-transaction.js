'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AgreementTransactions', {
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
    await queryInterface.dropTable('AgreementTransactions');
  }
};