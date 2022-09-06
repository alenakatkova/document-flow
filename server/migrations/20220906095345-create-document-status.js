'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DocumentStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage: {
        type: Sequelize.STRING
      },
      isAssistantResponsibility: {
        type: Sequelize.BOOLEAN
      },
      internalDepartmentId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'InternalDepartments',
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
    await queryInterface.dropTable('DocumentStatuses');
  }
};