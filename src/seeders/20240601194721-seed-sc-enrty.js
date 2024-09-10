"use strict";
const fs = require("fs");
const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const filePath = path.join(__dirname, "./data.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    await queryInterface.bulkInsert("eligible_student_lists", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("eligible_student_lists", null, {});
  },
};
