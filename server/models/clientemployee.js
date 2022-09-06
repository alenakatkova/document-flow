'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientEmployee extends Model {
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
      });
    }
  }

  ClientEmployee.init({
    name: DataTypes.STRING,
    officePhone: DataTypes.STRING,
    personalPhone: DataTypes.STRING,
    email: DataTypes.STRING,
    job: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    presentIdeas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClientEmployee',
  });
  return ClientEmployee;
};