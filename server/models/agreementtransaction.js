'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgreementTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.DocumentStatus, {
        foreignKey: "documentStatusId"
      });
      this.belongsTo(models.Agreement, {
        foreignKey: "agreementId"
      });
    }
  }

  AgreementTransaction.init({
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AgreementTransaction',
  });
  return AgreementTransaction;
};