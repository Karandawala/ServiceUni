const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  openFrom: String,
  openTo: String,
  value: String,
  duration: String,
  levelOfEnrolment: String,
  graduateType: String,
  numberAvailable: String,
  yearOfScholarship: String,
  degree: String,
  offerType: String,
  broadStudyArea: String,
  applicationCriteria: [String],
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

module.exports = Scholarship;
