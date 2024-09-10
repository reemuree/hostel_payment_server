"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class verify_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  verify_user.init(
    {
      phone_number: DataTypes.STRING,
      otp: DataTypes.STRING,
      otpCreatedAt: DataTypes.DATE,
      verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "verify_user",
    }
  );
  return verify_user;
};
