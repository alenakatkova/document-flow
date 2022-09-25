'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Counterparty extends Model {
    static associate(models) {
      this.belongsTo(models.Team, { foreignKey: "teamId" });
      this.hasMany(models.Contract, { foreignKey: "counterpartyId" });
      this.hasMany(models.Contact, { foreignKey: "counterpartyId" });
    }
  }

  Counterparty.init({
    name: DataTypes.STRING,
    isPriority: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    phone: DataTypes.STRING,
    bankDetails: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Counterparty",
  });
  return Counterparty;
};


