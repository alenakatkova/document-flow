'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("InternalContacts", [
      {
        name: "Иванов Иван",
        internalPhoneCode: "512",
        email: "ivanov@example.com",
        birthday: new Date(1987, 4, 14),
        job: "Начальник отдела",
        internalDepartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ковалева Анастасия",
        internalPhoneCode: "333",
        email: "kovaleva@example.com",
        birthday: new Date(1992, 5, 23),
        job: "Ассистент",
        internalDepartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Романова Екатерина",
        internalPhoneCode: "111",
        email: "romanova@example.com",
        birthday: new Date(1987, 6, 22),
        job: "Специалист первой категории",
        internalDepartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Шаронов Дмитрий",
        internalPhoneCode: "564",
        email: "sharonov@example.com",
        birthday: new Date(1999, 2, 14),
        job: "Бухгалтер",
        internalDepartmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("InternalContacts", null, {});
  }
};
