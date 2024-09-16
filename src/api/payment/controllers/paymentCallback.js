const { CLIENT } = require("../../../config/defaults");
const { StudentPayment, all_student } = require("../../../models");
require("dotenv").config();
const axios = require("axios");

const sendSms = async (to, message) => {
  try {
    const encodedMessage = encodeURIComponent(message);
    const response = await axios.get(
      `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_TOKEN}&message=${encodedMessage}&to=${to}`
    );
    console.log(`SMS sent to ${to}:`, response.data);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

const paymentCallback = async (req, res) => {
  try {
    const { order_id } = req.query;
    if (!order_id) {
      return res.status(400).json({ error: "Missing order ID" });
    }

    // Step 1: Get authentication token
    const authResponse = await axios.post(
      `${process.env.SHURJOPAY_API_URL}/api/get_token`,
      {
        username: process.env.SHURJOPAY_USERNAME,
        password: process.env.SHURJOPAY_PASSWORD,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token } = authResponse.data;

    // Step 2: Verify the transaction
    const verificationResponse = await axios.post(
      `${process.env.SHURJOPAY_API_URL}/api/verification`,
      { order_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const verificationData = verificationResponse.data[0];
    console.log(verificationData, "verificationData----------->");
    const payment = await StudentPayment.findOne({
      where: {
        id: verificationData.value1,
      },
    });

    if (!payment) {
      return res.redirect(`${CLIENT}/payment-failed`);
    }

    if (verificationData.sp_code !== "1000") {
      payment.transactionId = null;
      await payment.save();
      console.log("Payment Failed, transactionId set to null");
      return res.redirect(`${CLIENT}/payment-failed`);
    }

    if (parseFloat(payment.amount) !== parseFloat(verificationData.amount)) {
      return res.status(400).json({ error: "Amount mismatch" });
    }

    // Update payment status
    payment.status = true;
    payment.transactionId = verificationData.customer_order_id;
    payment.payment_method = verificationData.method;
    payment.order_id = verificationData.invoice_no;
    payment.account_number = verificationData.card_number;
    payment.updatedAt = new Date();
    await payment.save();

    const student = await all_student.findOne({
      where: {
        present_education_roll: payment.studentId,
      },
    });
    student.student_mobile_number = verificationData.phone_no;
    await student.save();

    // Send SMS notification
    const message = `Dear Student, Roll: ${
      payment.studentId
    } Amount: ${parseFloat(
      verificationData.amount
    )} BDT was successful. Thank you!`;
    await sendSms(verificationData.phone_no, message);

    // Redirect to frontend success page
    return res.redirect(
      `${CLIENT}/payment-success?order_id=${verificationData.invoice_no}`
    );
  } catch (error) {
    console.error("Error handling payment callback:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = paymentCallback;
