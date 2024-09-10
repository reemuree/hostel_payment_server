const existingStudentInfo = require("../../../models").scholership_entry; // Import your Sequelize model

const getExistingStudentInfo = async (req, res) => {
  const { rollNumber } = req.params;

  try {
    const entry = await existingStudentInfo.findOne({
      where: {
        present_education_roll: rollNumber, // Find a record by past_education_roll_number
      },
    });

    if (entry) {
      // If entry with the rollNumber exists
      return res.status(200).json({
        data: {
          student_name_english: entry.student_name_english,
          past_education_board: entry.past_education_board,
          present_education_roll: entry.present_education_roll,
          present_education_department: entry.present_education_department,
          present_education_shift: entry.present_education_shift,
          past_education_year: entry.past_education_year,
          past_education_result: entry.past_education_result,
          past_education_roll_number: entry.past_education_roll_number,
          present_education_registration_number:
            entry.present_education_registration_number,
        },
      });
    } else {
      // If entry with the rollNumber doesn't exist
      return res.status(404).json({ message: "Data not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Handle other errors
  }
};

module.exports = {
  getExistingStudentInfo,
};
