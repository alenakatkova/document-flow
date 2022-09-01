"use strict";

const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Team.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    main_contact: DataTypes.STRING,
    additional_contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Team",
    tableName: "team"
  });
  return Team;
};