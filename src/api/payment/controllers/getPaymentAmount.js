const { student_payment_detail } = require("../../../models");

const getPaymentAmount = async (req, res) => {
  try {
    const { student_id, admission_id } = req.body;
    const amountDetails = await student_payment_detail.findOne({
      where: { student_id, admission_id },
    });
    if (amountDetails) {
      return res.status(200).json({ amountDetails });
    } else {
      // No students found with the given searchText
      return res.status(404).json({ message: "Amount not found" });
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

module.exports = {
  getPaymentAmount,
};
