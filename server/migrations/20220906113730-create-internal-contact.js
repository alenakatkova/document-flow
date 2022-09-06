'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InternalContacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      internalPhoneCode: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      job: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('InternalContacts');
  }
};