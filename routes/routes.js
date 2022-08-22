const express = require("express");

const router = express.Router();

var ObjectId = require("mongodb").ObjectId;

module.exports = (app) => {
  // two routes for views

  router.get("/allfilms", (req, res) => {
    app
      .set("myDb")
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
    app
      .set("myDb")
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

  // two routes for JSON

  router.get("/api/allfilms", (req, res) => {
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({ filmCertificate: "PG" })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        res.json(docs);
      });
  });

  router.get("/api/film/:filmID", (req, res) => {
    let filmID = req.params.filmID;
    var o_id = new ObjectId(filmID);
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        res.json(docs);
      });
  });

  router.get("/addfilm", (req, res) => {
    return res.render("addfilm", { title: "Add a Film" });
  });

  // user added film from the web site
  router.post("/addfilm", (req, res) => {
    console.info("POST controller");
    var newFilm = req.body;
    console.dir(newFilm);
    app
      .get("myDb")
      .collection("filmsCollection")
      .insertOne(newFilm, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        if (dbResp.insertedCount === 1) {
          //res.json({ msg: "Successfully Added: " + dbResp.insertedId });

          res.redirect("/allfilms");
        } else {
          //res.json({ msg: "Not Updated" });
          res.redirect("/error");
        }
      });
  });

  router.post("/api/film", (req, res) => {
    console.info("POST controller");
    var newFilm = req.body;
    console.dir(newFilm);
    app
      .get("myDb")
      .collection("filmsCollection")
      .insertOne(newFilm, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        if (dbResp.insertedCount === 1) {
          res.json({ msg: "Successfully Added: " + dbResp.insertedId });
        } else {
          res.json({ msg: "Not Updated" });
        }
      });
  });

  router.put("/api/film", (req, res) => {
    //res.send("HTTP Put");
    console.info("PUT / UPDATE controller");
    var amendFilm = req.body;
    let filmID = amendFilm.filmID;
    var o_id = new ObjectId(filmID);
    console.info(o_id);
    app
      .get("myDb")
      .collection("filmsCollection")
      .updateOne(
        { _id: o_id },
        {
          $set: {
            filmName: amendFilm.filmName,
            filmCertificate: amendFilm.filmCertificate,
          },
        },
        function (err, dbResp) {
          if (err) {
            console.error(err);
          }
          if (dbResp.modifiedCount === 1) {
            res.json({ msg: "Successfully Amended" });
          } else {
            res.json({ msg: "Not Found" });
          }
        }
      );
  });

  router.delete("/api/film", (req, res) => {
    console.info("DELETE controller");
    var removeFilm = req.body;
    console.dir(removeFilm);
    var o_id = new ObjectId(removeFilm.filmID);
    app
      .get("myDb")
      .collection("filmsCollection")
      .deleteOne({ _id: o_id }, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        if (dbResp.deletedCount === 1) {
          res.json({ msg: "Successfully Removed" });
        } else {
          res.json({ msg: "Not Found" });
        }
      });
  });

  return router;
};
