'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("DocumentStatuses", [
      {
        stage: "Подготовка текста документа",
        isAssistantResponsibility: true,
        internalDepartmentId: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Согласование с юристами",
        isAssistantResponsibility: false,
        internalDepartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Исправление по комментариям",
        isAssistantResponsibility: true,
        internalDepartmentId: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Согласование с финансистами",
        isAssistantResponsibility: false,
        internalDepartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Согласование с бухгалтерией",
        isAssistantResponsibility: false,
        internalDepartmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Согласование с котрагентом",
        isAssistantResponsibility: false,
        internalDepartmentId: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Подписание",
        isAssistantResponsibility: true,
        internalDepartmentId: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Подписан",
        isAssistantResponsibility: false,
        internalDepartmentId: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stage: "Отменен",
        isAssistantResponsibility: false,
        internalDepartmentId: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("DocumentStatuses", null, {});
  }
};
