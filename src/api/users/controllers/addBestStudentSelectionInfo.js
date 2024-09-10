const BestStudentSelection = require("../../../models").BestStudentSelection;

const addBestStudentSelectionInfo = async (req, res) => {
  const user = req.user;
  const studentData = req.body;
  console.log(studentData);

  try {
    // Check if the student exists based on rollNumber
    const existingStudent = await BestStudentSelection.findOne({
      where: {
        present_education_roll: user.rollNumber,
      },
    });

    if (existingStudent) {
      // If student exists, update the data
      await BestStudentSelection.update(studentData, {
        where: {
          present_education_roll: user.rollNumber,
        },
      });

      return res
        .status(200)
        .json({ message: "Student data updated successfully." });
    } else {
      // If student doesn't exist, create a new record
      await BestStudentSelection.create({
        ...studentData,
        present_education_roll: user.rollNumber, // Ensure rollNumber is set in the data
      });

      return res
        .status(201)
        .json({ message: "New student data created successfully." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addBestStudentSelectionInfo;
