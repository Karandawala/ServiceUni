const mongoose = require("mongoose");

const dbUri =
  "mongodb+srv://ncjrox69:K6SJQ76eKxDXqqBS@cluster0.lkpuwvq.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

module.exports = () => {
  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
