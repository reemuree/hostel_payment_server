const StudentPayment = require("../../../models").StudentPayment;

const addStudentPayment = async (req, res) => {
  const { studentId, amount, admissionId, start_date, end_date } = req.body;
  // const { rollNumber } = req.params;
  try {
    const payment = await StudentPayment.create({
      studentId,
      admissionId,
      amount,
      start_date,
      end_date,
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = addStudentPayment;
