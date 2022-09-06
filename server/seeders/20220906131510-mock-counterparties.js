'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Counterparties", [
      {
        name: "АНООДО «ОКСФОРД»",
        isPriority: true,
        type: "client",
        phone: "+7 812 678 78 87",
        assistantEmail: "marketing@oksford-school.ru",
        bankDetails: "ИНН 83598273958902193230\n" +
            "\n" + "Почтовый адрес: город Санкт-Петербург, Дальневостосточный проспект, дом 12, корпус 2, строение 1,этаж 1, пом-33Н\n" +
            "\n" + "Юридический адрес: 197082, город Санкт-Петербург, Богатырский проспект, дом 64, корп. 1, лит А, пом-15Н",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "ООО «Скандинавская школа»",
        isPriority: false,
        type: "client",
        phone: "+7 495 678 00 87",
        assistantEmail: "marketing@scandinaviya.ru",
        bankDetails: "ИНН 9375235927\n" +
            "\n" + "Почтовый адрес: город Москва, Дальневостосточный проспект, дом 1\n" +
            "\n" + "Юридический адрес: 197082, город Москва, Богатырский проспект, дом 64, корп. 1, лит А, пом-15Н",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Газета Южный Урал",
        isPriority: false,
        type: "contractor",
        phone: "+7 3532 12 12 12",
        assistantEmail: "ad@rambler.ru",
        bankDetails: "ИНН 394027953\n" +
            "\n" + "Почтовый адрес: 197082, город Оренбург, ул. Восстания, дом 12\n" +
            "\n" + "Юридический адрес: 197082, город Оренбург, Сентябрьский проспект, дом 14б",
        teamId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Телеканал Оренбуржье",
        isPriority: false,
        type: "contractor",
        phone: "+7 3532 12 12 10",
        assistantEmail: "ad@oren.ru",
        bankDetails: "ИНН 39470237943\n" +
            "\n" + "Почтовый адрес: 197082, город Оренбург, ул. Восстания, дом 12\n" +
            "\n" + "Юридический адрес: 197082, город Оренбург, Сентябрьский проспект, дом 14б",
        teamId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "ООО Эд Он Тайм",
        isPriority: false,
        type: "contractor",
        phone: "+7 495 124 12 11",
        assistantEmail: "ad@adontime.ru",
        bankDetails: "ИНН 037590237450\n" +
            "\n" + "Почтовый адрес: 197082, город Москва, ул. Садовая, дом 12 литера Б, пом.14\n" +
            "\n" + "Юридический адрес: 197082, город Москва, ул. Садовая, дом 12 литера Б, пом.14",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Counterparties", null, {});
  }
};
