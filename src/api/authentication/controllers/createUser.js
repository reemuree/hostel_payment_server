const CryptoJS = require("crypto-js");
const user = require("../../../models").user;
require("dotenv").config();
const axios = require("axios");

// Function to generate a random alphanumeric string of given length
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const createUser = async (req, res) => {
  const { phone_number, username, rollNumber } = req.body;

  try {
    // Check if user with phone_number already exists
    const existingUser = await user.findOne({
      where: {
        rollNumber: rollNumber,
      },
    });

    const isMobilNumberUsed = await user.findOne({
      where: {
        phone_number: phone_number,
      },
    });

    if (existingUser || isMobilNumberUsed) {
      return res.status(400).json({ message: "User already registered." });
    } else {
      // Create a simple password (customize for better security)
      const password = phone_number.slice(3); // Example password creation

      // Hash the password using crypto-js module (SHA256 hashing algorithm)
      const hashedPassword = CryptoJS.SHA256(password).toString();

      // Create the user with the hashed password
      const newUser = await user.create({
        phone_number: phone_number,
        username: username,
        rollNumber: rollNumber,
        password: hashedPassword,
        verified: false,
      });

      // Generate a random clienttransid
      const clienttransid = generateRandomString(16);

      // Include roll number in the SMS message
      const message = `Your username: ${phone_number}, Password: ${password}`;

      // Send user credentials via SMS
      const smsData = {
        username: "lislam1234",
        password: "Rajpoly23105$",
        apicode: "5",
        msisdn: [`${phone_number}`],
        countrycode: "880",
        cli: "AcademicRPI",
        messagetype: "1",
        message: message,
        clienttransid: clienttransid,
        bill_msisdn: "8801969908410",
        tran_type: "T",
        request_type: "S",
        rn_code: "91",
      };

      axios
        .post("https://corpsms.banglalink.net/bl/api/v1/smsapigw/", smsData)
        .then((response) => {
          console.log("SMS sent successfully:", response.data);
          return res.status(201).json({
            message: "User created. Credentials sent via SMS.",
            user: { phone_number, password },
          });
        })
        .catch((error) => {
          console.error("Error sending SMS:", error.response.data);
        });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
