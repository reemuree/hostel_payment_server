const BestStudentSelection = require("../../../models").BestStudentSelection;

const getBestStudentSelectionInfo = async (req, res) => {
  const { rollNumber } = req.user;

  try {
    // Retrieve student information based on rollNumber
    const studentInfo = await BestStudentSelection.findOne({
      where: {
        present_education_roll: rollNumber,
      },
    });

    if (studentInfo) {
      return res.status(200).json({ data: studentInfo });
    } else {
      return res.status(404).json({ message: "Student not found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getBestStudentSelectionInfo,
};
