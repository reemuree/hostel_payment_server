const Student = require("../../../models").all_student;

const getSingleStudentData = async (req, res) => {
  const present_education_roll = req.user.dataValues.present_education_roll;

  try {
    const student = await Student.findOne({
      where: { present_education_roll },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    console.error("Error retrieving student data:", error);
    res.status(500).json({ message: "Error retrieving student data" });
  }
};

module.exports = getSingleStudentData;
