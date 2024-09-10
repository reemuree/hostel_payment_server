"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class StudentPortalFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  StudentPortalFeature.init(
    {
      nid_validation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stipend_apply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      information_change: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "StudentPortalFeature",
      tableName: "student_portal_features",
      underscored: true,
    }
  );

  return StudentPortalFeature;
};
