'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Agreement, {
        foreignKey: "agreementId"
      });
    }
  }

  Invoice.init({
    number: DataTypes.STRING,
    due: DataTypes.DATE,
    status: DataTypes.STRING,
    linkToFile: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};