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
      this.hasOne(models.DocumentStatus, {
        foreignKey: "internalDepartmentId"
      });
      this.hasMany(models.InternalContact, {
        foreignKey: "internalDepartmentId"
      });
    }
  }

  InternalDepartment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InternalDepartment',
  });
  return InternalDepartment;
};