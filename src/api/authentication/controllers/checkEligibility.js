const eligible_student_list = require("../../../models").eligible_student_list;
const allUser = require("../../../models").user;

const checkEligibility = async (req, res) => {
  const { rollNumber, registrationNumber, phoneNumber } = req.body;
  console.log(phoneNumber);

  try {
    const existingUser = await allUser.findOne({
      where: {
        rollNumber: rollNumber,
      },
    });
    const existingNumber = await allUser.findOne({
      where: {
        phone_number: phoneNumber,
      },
    });
    console.log("existingNumber", existingNumber);
    if (existingUser) {
      return res.status(400).json({ message: "User Already Registered" });
    }
    if (existingNumber) {
      return res
        .status(400)
        .json({ message: "Phone Number Already Registered " });
    }

    const student = await eligible_student_list.findOne({
      where: {
        rollNumber: rollNumber,
        registrationNumber: registrationNumber, // Check both rollNumber and registrationNumber
      },
    });
    if (student) {
      return res.status(200).json({ message: "Success! You are eligible." });
    } else {
      return res.status(404).json({ message: "You are not eligible." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkEligibility,
};
