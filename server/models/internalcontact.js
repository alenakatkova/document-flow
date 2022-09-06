'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InternalContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.InternalDepartment, {
        foreignKey: "internalDepartmentId"
      });
    }
  }

  InternalContact.init({
    name: DataTypes.STRING,
    internalPhoneCode: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.STRING,
    job: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InternalContact',
  });
  return InternalContact;
};