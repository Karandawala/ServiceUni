const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//local imports
const connectDb = require("./db.js");
const peerSessionsRoutes = require("./controllers/peerSessions.controller.js");
const scholarshipsApplicationRoutes = require("./controllers/scholarshipsApplication.controller.js");
const scholarships = require("./controllers/scholarship.controller.js");
const postals = require("./controllers/postal.controller.js");
const { errorHandler } = require("./middlewares");

const app = express();

app.use(cors());
app.use('/fileStorage', express.static('fileStorage'))

//middleware
app.use(bodyParser.json({ limit: "20mb" }));
app.use("/api/peerSessions", peerSessionsRoutes);
app.use("/api/scholarships", scholarships);
app.use("/api/postal", postals);

app.use("/api/scholarshipsApplications", scholarshipsApplicationRoutes);
app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("db connection succeeded.");
    app.listen(3500, () => console.log("server started at 3500."));
  })
  .catch((err) => console.log(err));
