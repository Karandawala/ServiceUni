const mongoose = require("mongoose");

const scholarshipsApplicationSchema = new mongoose.Schema({
  scholId: { type: String },
  scholName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  status: { type: String },
  cvFile: { type: String }, // Store CV file as a binary buffer
  recommendationLetterFile: { type: String }, // Store recommendation letter as a binary buffer
  additionalInfo: { type: String },
});

module.exports = mongoose.model(
  "scholarshipsApplication",
  scholarshipsApplicationSchema
);
