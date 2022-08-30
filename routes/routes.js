const express = require("express");

const router = express.Router();

const dbo = require("../db/connection");
var ObjectId = dbo.getObjectId();

router.get("/allfilms", (req, res) => {
  dbo
    .getDb()
    .collection("filmsCollection")
    // .find({filmCertificate: "PG", filmPrice:{$gt:"6.00"}})
    .find()
    .toArray(function (err, docs) {
      if (err) {
        console.error(err);
      }
      return res.render("films", { title: "All Films", films: docs });
    });
});

router.get("/film/:filmID", (req, res) => {
  let filmID = req.params.filmID;
  var o_id = new ObjectId(filmID);
  dbo
    .getDb()
    .collection("filmsCollection")
    .find({ _id: o_id })
    .toArray(function (err, docs) {
      if (err) {
        console.error(err);
      }
      console.dir(docs);
      return res.render("oneFilm", {
        title: docs[0].filmTitle,
        film: docs[0],
      });
    });
});

module.exports = router;
