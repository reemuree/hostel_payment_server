"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BestStudentSelection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BestStudentSelection.init(
    {
      present_education_roll: DataTypes.STRING,
      ssc_or_hsc: DataTypes.STRING,
      ssc_hsc_result: DataTypes.STRING,
      ssc_hsc_result_marksheet: DataTypes.STRING,
      last_semester: DataTypes.STRING,
      last_semester_result: DataTypes.STRING,
      last_semester_marksheet: DataTypes.STRING,
      attendance_percentage: DataTypes.FLOAT,
      cultural_activities: DataTypes.STRING,
      cultural_activities_document: DataTypes.STRING,
      sports_activities: DataTypes.STRING,
      sports_activities_document: DataTypes.STRING,
      innovation_skills: DataTypes.STRING,
      innovation_skills_document: DataTypes.STRING,
      volunteer_activities: DataTypes.STRING,
      volunteer_activities_document: DataTypes.STRING,
      ielts_score: DataTypes.FLOAT,
      ielts_score_document: DataTypes.STRING,
      toefl_score: DataTypes.FLOAT,
      toelf_score_document: DataTypes.STRING,
      ntvqf_level: DataTypes.STRING,
      ntvqf_level_document: DataTypes.STRING,
      publication_writing_skills: DataTypes.STRING,
      publication_writing_skills_document: DataTypes.STRING,
      leadership_skills: DataTypes.STRING,
      social_working_activites: DataTypes.STRING,
      moral_activities: DataTypes.STRING,
      ict_skills: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BestStudentSelection",
    }
  );
  return BestStudentSelection;
};
