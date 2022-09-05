"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("client", [
      {
        fullName: "Публичное акционерное общество «Банк «Оренбург»",
        shortName: "ПАО «Банк «Оренбург»",
        businessAddress: "195112, Оренбург, ул. Ветеранов, д.1",
        postalAddress: "195112, Оренбург, ул. Ветеранов, д.1",
        inn: "927358923",
        kpp: "2334547845",
        account: "932475839749013493",
        corrAccount: "039475839409348023",
        phone: "+7-800-345-22-33",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: "Публичное акционерное общество «Банк «Саратов»",
        shortName: "ПАО «Банк «Саратов»",
        businessAddress: "195452, Саратов, ул. Буруктальская, д.2",
        postalAddress: "195312, Оренбург, ул. Буруктальская, д.2",
        inn: "92234258923",
        kpp: "2354547845",
        account: "983475091282934",
        corrAccount: "80239450234",
        phone: "+7-3532-45-22-55",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: "Индивидуальный предприниматель «Воронцова А.Е.»",
        shortName: "ИП «Воронцова А.Е.»",
        businessAddress: "334455, Саратов, ул. Огненная, д.2",
        postalAddress: "389454, Саратов, ул. Огненная, д.2",
        inn: "273592393",
        kpp: "29235235235",
        account: "23523235343463465",
        corrAccount: "34634634634634",
        phone: "+7-3532-65-54-33",
        teamId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("client", null, {});
  }
};
