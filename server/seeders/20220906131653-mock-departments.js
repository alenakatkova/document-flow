'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("InternalDepartments", [
      {
        name: "Юридический отдел",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Финансовый отдел",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Бухгалтерия",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("InternalDepartments", null, {});
  }
};
