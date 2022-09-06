'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agreements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      signDate: {
        type: Sequelize.DATE
      },
      linkToFile: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Agreements');
  }
};