'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractorContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Contractor, {
        foreignKey: {
          name: "contractorId"
        }
      })
    }
  }

  ContractorContract.init({
    number: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    linkToFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractorContract',
  });
  return ContractorContract;
};