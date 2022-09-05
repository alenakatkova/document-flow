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
      this.hasMany(models.Client, {
        foreignKey: 'teamId'
      });
    }
  }

  Team.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    assistantName: DataTypes.STRING,
    assistantEmail: DataTypes.STRING,
    juniorName: DataTypes.STRING,
    juniorEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Team",
    tableName: "team"
  });
  return Team;
};

