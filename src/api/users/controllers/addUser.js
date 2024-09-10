const UsersTable = require("../../../models").user;
const crypto = require("crypto-js");

const addUser = async (req, res) => {
  try {
    const { phone_number, password, verified, username } = req.body;

    // Hash the password before saving
    const hashedPassword = hashPassword(password);

    const userData = await UsersTable.create({
      phone_number,
      password: hashedPassword,
      verified,
      username,
    });

    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hashPassword = (password) => {
  // Hash the password using CryptoJS (SHA256 in this example)
  const hashedPassword = crypto.SHA256(password).toString();

  return hashedPassword;
};

module.exports = addUser;
