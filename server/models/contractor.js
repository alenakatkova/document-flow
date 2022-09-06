'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contractor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ContractorContract, {
        foreignKey: "contractorId"
      });
    }
  }

  Contractor.init({
    name: DataTypes.STRING,
    bankDetails: DataTypes.STRING,
    officeAddress: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contractor',
  });
  return Contractor;
};