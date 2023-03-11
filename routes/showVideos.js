const express = require("express");
const videoDetails = require("../models/videoDetails");
const router = express.Router();

router.get("/", (req, res, next) => {
  videoDetails
    .find()
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get(`/:id`, (req, res, next) => {
  const _id = req.params.id;
  videoDetails
    .findById({ _id })
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
