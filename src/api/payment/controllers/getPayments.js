const Admission = require("../../../models").Admission;
const Student = require("../../../models").all_student;
const StudentPayment = require("../../../models").StudentPayment;

const getPayments = async (req, res) => {
  const user = req.user;
  const studentId = user?.dataValues.present_education_roll;
  console.log(user?.dataValues.present_education_roll);

  try {
    const student = await Student.findOne({
      where: { present_education_roll: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const admissions = await Admission.findAll();
    const relevantAdmissions = admissions.filter((admission) =>
      admission.semesters.includes(student.present_education_semester)
    );

    const admissionIds = relevantAdmissions.map((admission) => admission.id);

    // Fetch payments for the student and relevant admissions
    const payments = await StudentPayment.findAll({
      where: {
        studentId,
        admissionId: admissionIds,
      },
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

    // Construct payment information for each admission
    const paymentInfos = payments.map((payment) => {
      const admission = payment.Admission; // Access the associated Admission
      const currentDate = new Date();
      let payment_status = "Unpaid";
      if (payment.status) {
        payment_status = "Paid";
      } else if (new Date(admission.late_date) < currentDate) {
        payment_status = "Expired";
      } else if (new Date(admission.end_date) < currentDate) {
        payment_status = "Late";
      }

      return {
        id: payment.id,
        name: admission.name,
        amount: payment.amount,
        start_date: payment.start_date,
        end_date: payment.end_date,
        payment_method: payment.payment_method,
        transactionId: payment.transactionId,
        payment_status: payment_status,
        start_date: admission.start_date,
        end_date: admission.end_date,
        late_date: admission.late_date,
        oder_id: payment.order_id,
      };
    });

    res.json(paymentInfos); // Send payment information to the client
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPayments;
