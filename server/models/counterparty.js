'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counterparty extends Model {
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
    }
  }

  Counterparty.init({
    name: DataTypes.STRING,
    bankDetails: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Counterparty',
  });
  return Counterparty;
};