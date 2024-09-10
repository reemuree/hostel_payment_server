const { StudentPortalFeature } = require("../../../models");

const getFeatureStatus = async (req, res) => {
  try {
    const { columnName } = req.params;

    if (!columnName) {
      return res.status(400).json({ error: "Column name is required" });
    }

    // Check if the columnName exists in the model
    if (!Object.keys(StudentPortalFeature.rawAttributes).includes(columnName)) {
      return res.status(400).json({
        error: `Column "${columnName}" does not exist in StudentPortalFeature model`,
      });
    }

    // Query the database to get the value of the specified column
    const feature = await StudentPortalFeature.findOne({
      attributes: [columnName],
    });

    if (!feature) {
      return res
        .status(404)
        .json({ error: "No entry found in StudentPortalFeature" });
    }

    return res.status(200).json({ [columnName]: feature[columnName] });
  } catch (error) {
    console.error("Error fetching feature:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the feature" });
  }
};

module.exports = {
  getFeatureStatus,
};
