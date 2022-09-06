'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InternalDepartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.DocumentStatus, {
        foreignKey: "documentStatusId"
      });
    }
  }

  InternalDepartment.init({
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InternalContact',
  });
  return InternalDepartment;
};