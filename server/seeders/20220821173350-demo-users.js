'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        username: "demo-user",
        password: "password",
        email: "example@example.com",
        age: 31,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "admin",
        password: "admin",
        email: "admin@example.com",
        age: 77,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
