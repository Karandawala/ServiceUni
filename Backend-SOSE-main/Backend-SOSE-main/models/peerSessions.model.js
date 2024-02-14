const mongoose = require("mongoose");

module.exports = mongoose.model("PeerSessions", {
  name: { type: String },
  subCode: { type: String },
  subname: { type: String },
  description: { type: String },
  numberPeer: { type: Array },
  location: { type: String },
  Date: { type: String },
  Time: { type: String },
  createdby: { type: String },
  createdDate: { type: String },
});
