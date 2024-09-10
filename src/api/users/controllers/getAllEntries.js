const ScholarshipEntry = require("../../../models").scholership_entry; // Import your Sequelize model

// Controller function to get all scholarship entries
const getAllEntries = async (req, res) => {
  try {
    const entries = await ScholarshipEntry.findAll(); // Fetch all entries from the database
    res.json(entries); // Send retrieved data as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors if any
  }
};

// Other controller functions for specific queries can be added here

module.exports = {
  getAllEntries,
  // Add other controller functions here for specific queries
};
