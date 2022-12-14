'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ContractTransaction, {
        foreignKey: "documentStatusId"
      });
      this.belongsTo(models.InternalDepartment, {
        foreignKey: "internalDepartmentId"
      });
    }
  }

  DocumentStatus.init({
    stage: DataTypes.STRING,
    isAssistantResponsibility: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DocumentStatus',
  });
  return DocumentStatus;
};