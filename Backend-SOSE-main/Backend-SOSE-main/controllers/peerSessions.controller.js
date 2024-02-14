const express = require("express");
const router = express.Router();

const PeerSessions = require("../models/peerSessions.model");
const { generateCrudMethods } = require("../services");
const peerSessionsCrud = generateCrudMethods(PeerSessions);
const { validateDbId, raiseRecord404Error } = require("../middlewares");

router.get("/", (req, res, next) => {
  peerSessionsCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:id", validateDbId, (req, res, next) => {
  peerSessionsCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  peerSessionsCrud
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", validateDbId, (req, res) => {
  peerSessionsCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/:id", validateDbId, (req, res) => {
  peerSessionsCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

module.exports = router;
