const router = require("express").Router();
const verifyToken = require("../../middlewares/verifyToken");
const addStudentPayment = require("../../api/payment/controllers/addStudentPayment");
const addAdmission = require("../../api/payment/controllers/addAdmission");
const getPayments = require("../../api/payment/controllers/getPayments");
const initiatePayment = require("../../api/payment/controllers/initiatePayment");
const paymentCallback = require("../../api/payment/controllers/paymentCallback");
const getCurrentPayment = require("../../api/payment/controllers/getCurrentPayment");
const {
  getPaymentAmount,
} = require("../../api/payment/controllers/getPaymentAmount");

// router.post("/addStudentPayment", addStudentPayment);
// router.post("/addAdmission", verifyToken, addAdmission);
router.get("/getPayments", verifyToken, getPayments);
router.get("/getCurrentPayment", verifyToken, getCurrentPayment);
router.post("/payment/initiate", verifyToken, initiatePayment);
router.get("/callback", paymentCallback); // No verifyToken middleware here
router.post("/get-payment-amount", verifyToken, getPaymentAmount);

module.exports = router;
