"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admission.init(
    {
      identify: DataTypes.STRING,
      name: DataTypes.STRING,
      semesters: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      late_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Admission",
    }
  );
  return Admission;
};
