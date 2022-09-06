'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CounterpartyType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  CounterpartyType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CounterpartyType',
    tableName: 'counterpartyType',
    timestamps: false
  });
  return CounterpartyType;
};