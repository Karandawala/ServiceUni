const express = require("express");
const router = express.Router();

const Postal = require("../models/postal.model");
const { generateCrudMethods } = require("../services");
const postalCrud = generateCrudMethods(Postal);
const { validateDbId, raiseRecord404Error } = require("../middlewares");

router.get("/", (req, res, next) => {
  postalCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.post("/checkcost", (req, res, next) => {
  const { weight, length, width, height, destination } = req.body;
  res.send(calculatePostageCost(weight, length, width, height, destination));
});

router.get("/:id", validateDbId, (req, res, next) => {
  postalCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  postalCrud
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", validateDbId, (req, res) => {
  postalCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/:id", validateDbId, (req, res) => {
  postalCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

function calculatePostageCost(weight, length, width, height, destination) {
  // Define postage rates for each Australian state in cents per gram

  const source = "New South Wales";
  const postageRates = {
    "New South Wales": {
      "New South Wales": 0, // No additional cost for sending from NSW
      "Victoria": 5,
      "Queensland": 7,
      "South Australia": 6,
      "Western Australia": 8,
      "Tasmania": 7.5,
      "Northern Territory": 9,
      "Australian Capital Territory": 6.5,
    },
  };

  // Check if source and destination are valid
  if (!postageRates[source] || !postageRates[source][destination]) {
    return "Invalid source or destination";
  }

  // Calculate the postage cost based on weight
  const postageRate = postageRates[source][destination];
  const costInCents = weight * postageRate;

  // Calculate the cost based on dimensions (volume-based pricing)
  const volume = length * width * height;
  const dimensionCost = volume * 0.1; // Example pricing based on volume

  // Calculate the final postage cost by adding weight and dimension costs
  const totalCostInCents = costInCents + dimensionCost;

  // Convert to dollars and round to 2 decimal places
  const totalCostInDollars = (totalCostInCents / 1000).toFixed(2);

  return `The postage cost to ${destination} from ${source} is $${totalCostInDollars}`;
}

module.exports = router;
