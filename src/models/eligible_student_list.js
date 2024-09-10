"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class eligible_student_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  eligible_student_list.init(
    {
      rollNumber: DataTypes.INTEGER,
      registrationNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "eligible_student_list",
      timestamps: false,
    }
  );
  return eligible_student_list;
};
