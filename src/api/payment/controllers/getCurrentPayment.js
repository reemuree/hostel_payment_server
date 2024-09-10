const {
  Admission,
  all_student: Student,
  StudentPayment,
} = require("../../../models");

const getCurrentPayment = async (req, res) => {
  const { user } = req;
  const studentId = user?.dataValues.present_education_roll;

  if (!studentId) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  try {
    const student = await Student.findOne({
      where: { present_education_roll: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payment = await StudentPayment.findOne({
      where: { studentId, admissionId: 3 },
      include: [
        {
          model: Admission,
          attributes: [
            "name",
            "identify",
            "start_date",
            "end_date",
            "late_date",
          ],
        },
      ],
    });
    console.log(payment, "payment--------->");
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    res.json({ payment });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getCurrentPayment;
