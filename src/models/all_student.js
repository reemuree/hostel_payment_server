"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AllStudents extends Model {
    static associate(models) {}
  }

  AllStudents.init(
    {
      student_name_english: DataTypes.STRING,
      present_education_roll: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      present_education_semester: DataTypes.STRING,
      present_education_department: DataTypes.STRING,
      present_education_shift: DataTypes.STRING,
      present_education_group: DataTypes.STRING,
      student_mobile_number: DataTypes.STRING,
      present_education_season: DataTypes.STRING,
      present_education_registration_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "all_student",
      tableName: "all_students",
      timestamps: false,
    }
  );

  return AllStudents;
};
