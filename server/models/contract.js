'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Counterparty, {
        foreignKey: "counterpartyId"
      });
      this.hasMany(models.Agreement, {
        foreignKey: "contractId"
      });
      this.hasMany(models.ContractTransaction, {
        foreignKey: "contractId"
      })
    }
  }

  Contract.init({
    number: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    linkToFileOnDisk: DataTypes.STRING,
    signDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};