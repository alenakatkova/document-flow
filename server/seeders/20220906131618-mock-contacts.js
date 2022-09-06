'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Contacts", [
      {
        name: "Краснова Ольга Сергеевна",
        phone: "8 333 333-33-33",
        email: "krasnova@example.com",
        birthday: new Date(1989, 10, 10),
        job: "Начальник отдела маркетинга",
        counterpartyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Колпаков Сергей Петрович",
        phone: "8 33 333-33-33",
        email: "kolpakov@example.com",
        birthday: new Date(1988, 10, 12),
        job: "Ассистент отдела маркетинга",
        counterpartyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Астафьева Ольга Сергеевна",
        phone: "8 333 333-33-33",
        email: "astafeva@example.com",
        birthday: new Date(1975, 11, 10),
        job: "Начальник отдела маркетинга",
        counterpartyId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Смирнов Сергей Петрович",
        phone: "8 000 000-00-00",
        email: "smirnov@example.com",
        birthday: new Date(2001, 10, 14),
        job: "Специалист отдела маркетинга",
        counterpartyId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Борисов Евгений Петрович",
        phone: "8 000 000-00-00",
        email: "borisov@example.com",
        birthday: new Date(1991, 10, 20),
        job: "Специалист отдела маркетинга",
        counterpartyId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Штукатурова Анна",
        phone: "8 000 000-00-00",
        email: "shtukaturova@example.com",
        birthday: new Date(1966, 10, 14),
        job: "Специалист отдела маркетинга",
        counterpartyId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Алексеевва Жанна",
        phone: "8 000 000-00-00",
        email: "alekseeva@example.com",
        birthday: new Date(2000, 10, 14),
        job: "Ассистент отдела маркетинга",
        counterpartyId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Contacts", null, {});
  }
};
