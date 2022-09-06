"use strict";

const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Team, {
        foreignKey: {
          name: "teamId"
        }
      });
      this.hasMany(models.ClientContract, {
        foreignKey: "clientId"
      });
    }
  }

  Client.init({
    name: DataTypes.STRING,
    bankDetails: DataTypes.STRING,
    isPriority: DataTypes.BOOLEAN,
    officeAddress: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Client",
    tableName: "client"
  });
  return Client;
};