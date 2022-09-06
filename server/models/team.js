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
      this.hasMany(models.Counterparty, {
        foreignKey: 'teamId'
      });
    }
  }

  Team.init({
    username: DataTypes.STRING,
    managerName: DataTypes.STRING,
    password: DataTypes.STRING,
    assistantName: DataTypes.STRING,
    assistantEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Team",
  });
  return Team;
};

