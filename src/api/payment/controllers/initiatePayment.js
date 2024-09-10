const { StudentPayment } = require("../../../models");
require("dotenv").config();
const axios = require("axios");

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const initiatePayment = async (req, res) => {
  try {
    const {
      cus_email = "sdgdsg@gmail.com",
      cus_name = "tdtdrte",
      cus_phone = "23523",
      desc = "gsdjgs",
      currency = "BDT",
      paymentId,
    } = req.body;

    if (
      !cus_email ||
      !cus_name ||
      !cus_phone ||
      !desc ||
      !currency ||
      !paymentId
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const payment = await StudentPayment.findOne({ where: { id: paymentId } });

    if (!payment) {
      return res
        .status(404)
        .json({ error: "Student payment record not found" });
    }

    if (payment.status === true) {
      return res.status(400).json({ error: "Already paid" });
    }

    const tran_id = generateUUID();

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

    const { token, store_id } = authResponse.data;
    console.log(token);

    // Step 2: Initiate payment
    const paymentData = {
      prefix: "RPI",
      token,
      return_url: `${process.env.BASE_URL}/callback`,
      cancel_url: `${process.env.BASE_URL}/callback`,
      store_id,
      amount: payment.amount,
      order_id: tran_id,
      currency,
      customer_name: cus_name,
      customer_address: " Bangladesh",
      customer_phone: cus_phone,
      customer_city: "Dhaka",
      customer_post_code: "1212",
      client_ip: req.ip,
      customer_email: cus_email,
      customer_state: "Dhaka",
      customer_postcode: "1212",
      customer_country: "BD",
      value1: paymentId,
    };

    const { data } = await axios.post(
      `${process.env.SHURJOPAY_API_URL}/api/secret-pay`,
      paymentData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!data.checkout_url) {
      return res.status(500).json({ error: "Failed to initiate payment" });
    }
    payment.transactionId = tran_id;
    await payment.save();
    res.status(200).json({ payment_url: data.checkout_url });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = initiatePayment;
