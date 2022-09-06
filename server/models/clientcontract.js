"use strict";

const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClientContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Client, {
        foreignKey: {
          name: "clientId"
        }
      })
    }
  }

  ClientContract.init({
    number: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: "ClientContract",
    tableName: "clientContract"
  });
  return ClientContract;
};