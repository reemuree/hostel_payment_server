const Student = require("../../../models").student_info;

const addStudentInfo = async (req, res) => {
  const { username } = req.params;
  const studentData = req.body;
  console.log(studentData);

  try {
    // Check if the student exists based on rollNumber
    const existingStudent = await Student.findOne({
      where: {
        username,
      },
    });

    if (existingStudent) {
      // If student exists, update the data
      await Student.update(studentData, {
        where: {
          username,
        },
      });

      return res
        .status(200)
        .json({ message: "Student data updated successfully." });
    } else {
      // If student doesn't exist, create a new record
      await Student.create({
        ...studentData,
        username, // Ensure rollNumber is set in the data
      });

      return res
        .status(201)
        .json({ message: "New student data created successfully." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Handle other errors
  }
};

module.exports = {
  addStudentInfo,
};
