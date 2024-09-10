const allUser = require("../../../models").all_student;
const crypto = require("crypto-js");
const createToken = require("../../../lib/authentication/createToken");
const signIn = async (req, res) => {
  const { phone_number, rollNumber } = req.body;
  try {
    // Check if the user exists with the provided phone number
    const user = await allUser.findOne({
      where: { present_education_roll: rollNumber },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = createToken({ ...user, phone_number });

    // Set expiration time for the cookie (in milliseconds)
    const expiration = 24 * 60 * 60 * 1000; // 1 day (adjust as needed)

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        expires: new Date(Date.now() + expiration),
      })
      .send({
        success: true,
        rollNumber,
        phone_number,
      });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({ message: "Error signing in" });
  }
};

// Function to verify the password
const verifyPassword = (password, storedPassword) => {
  // Implement your password verification logic here
  // For example, comparing plain text passwords or using crypto for hashing comparison
  // This is just an example; use a strong hashing technique in production
  const hashedInputPassword = hashPassword(password); // Hash the input password
  return hashedInputPassword === storedPassword; // Compare the hashed input password with the stored password
};

// Function to hash the password using crypto-js (example hashing function)
const hashPassword = (password) => {
  return crypto.SHA256(password).toString();
};

module.exports = {
  signIn,
};
