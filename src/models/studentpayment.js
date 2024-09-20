const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class StudentPayment extends Model {
    static associate(models) {
      // Define association with Admission model
      StudentPayment.belongsTo(models.Admission, { foreignKey: "admissionId" });
    }
  }
  StudentPayment.init(
    {
      studentId: DataTypes.STRING,
      admissionId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      amount_details: DataTypes.JSON,
      status: { type: DataTypes.BOOLEAN, defaultValue: false },
      transactionId: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      order_id: DataTypes.STRING,
      account_number: DataTypes.STRING,
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "StudentPayment",
    }
  );
  return StudentPayment;
};
