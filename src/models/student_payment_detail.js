"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student_payment_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_payment_detail.init(
    {
      admission_id: DataTypes.INTEGER,
      student_id: DataTypes.INTEGER,
      reffered_fees: DataTypes.INTEGER,
      mark_sheet: DataTypes.INTEGER,
      center_fees: DataTypes.INTEGER,
      practical_fees: DataTypes.INTEGER,
      examination: DataTypes.INTEGER,
      industrial_training: DataTypes.INTEGER,
      certificate: DataTypes.INTEGER,
      make_up: DataTypes.INTEGER,
      questions: DataTypes.INTEGER,
      session_charge: DataTypes.INTEGER,
      total_fees: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "student_payment_detail",
      timestamps: false,
    }
  );
  return student_payment_detail;
};
