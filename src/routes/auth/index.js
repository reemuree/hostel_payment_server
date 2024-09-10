const {
  changePassword,
} = require("../../api/authentication/controllers/changePassword");
const {
  checkEligibility,
} = require("../../api/authentication/controllers/checkEligibility");
const createAuthCookie = require("../../api/authentication/controllers/createAuthCookie");
const {
  createUser,
} = require("../../api/authentication/controllers/createUser");
const {
  getExistingStudentInfo,
} = require("../../api/authentication/controllers/getExistingStudentInfo");
const logout = require("../../api/authentication/controllers/logout");
const { signIn } = require("../../api/authentication/controllers/signIn");
const verifyToken = require("../../middlewares/verifyToken");
const router = require("express").Router();

router.post("/VerifyEligibility", checkEligibility);
// router.get("/getExistingStudentInfo/:rollNumber", getExistingStudentInfo);

// router.post("/register", createUser);

router.post("/signIn", signIn);
// router.post("/changePassword", verifyToken, changePassword);

// router.post("/jwt", createAuthCookie);
router.get("/logout", logout);
module.exports = router;
