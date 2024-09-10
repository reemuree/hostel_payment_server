const addBestStudentSelectionInfo = require("../../api/users/controllers/addBestStudentSelectionInfo");
const {
  addStudentInfo,
} = require("../../api/users/controllers/addStudentInfo");
const {
  getBestStudentSelectionInfo,
} = require("../../api/users/controllers/getBestStudentSelectionInfo");
const {
  getFeatureStatus,
} = require("../../api/users/controllers/getFeatureStatus");
const getSingleStudentData = require("../../api/users/controllers/getSingleStudentData");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.put("/updateOrCreate/:username", verifyToken, addStudentInfo);

router.get("/student", verifyToken, getSingleStudentData);

router.put("/best-student-selection", verifyToken, addBestStudentSelectionInfo);
router.get("/best-student-selection", verifyToken, getBestStudentSelectionInfo);
router.get("/get-feature-status/:columnName", getFeatureStatus);

module.exports = router;
