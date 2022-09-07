'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agreement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Contract, {
        foreignKey: "contractId"
      });
      this.hasMany(models.AgreementTransaction, {
        onDelete: "cascade",
        onUpdate: "cascade",
        foreignKey: "agreementId"
      });
      this.hasOne(models.Invoice, {
        onDelete: "cascade",
        onUpdate: "cascade",
        foreignKey: "agreementId"
      });
    }
  }

  Agreement.init({
    number: DataTypes.STRING,
    signDate: DataTypes.DATE,
    linkToFile: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Agreement',
  });
  return Agreement;
};