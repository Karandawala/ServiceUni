const express = require("express");
const router = express.Router();

const scholarshipsApplication = require("../models/scholarshipsApplication.model");
const { generateCrudMethods } = require("../services");
const fs = require("fs");
const scholarshipsApplicationCrud = generateCrudMethods(
  scholarshipsApplication
);

router.get("/", (req, res, next) => {
  scholarshipsApplicationCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  scholarshipsApplicationCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  console.log("Data Received");

  var base64CVFile = req.body.cvFile;
  var base64RecommendationFile = req.body.recommendationLetterFile;

  // Generate timestamp
  var timestamp = new Date().getTime();

  // Save CV file with timestamp
  var cvFileName = "fileStorage/cv_" + timestamp + ".pdf";
  let base64CVImage = base64CVFile.split(";base64,").pop();
  fs.writeFile(
    cvFileName,
    base64CVImage,
    { encoding: "base64" },
    function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("CV file created: " + cvFileName);
      }
    }
  );

  // Save recommendation file with timestamp
  var recommendationFileName =
    "fileStorage/recommendation_" + timestamp + ".pdf";
  let base64RecommendationImage = base64RecommendationFile
    .split(";base64,")
    .pop();
  fs.writeFile(
    recommendationFileName,
    base64RecommendationImage,
    { encoding: "base64" },
    function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Recommendation file created: " + recommendationFileName);
      }
    }
  );

  //   console.log(res);
  dataReceived = req.body;

  // Add new key-value pairs
  dataReceived.cvFile = cvFileName;
  dataReceived.status = 'pending'
  dataReceived.recommendationLetterFile = recommendationFileName;
  scholarshipsApplicationCrud
    .create(dataReceived)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", (req, res) => {
  scholarshipsApplicationCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res) => {
  scholarshipsApplicationCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

module.exports = router;
