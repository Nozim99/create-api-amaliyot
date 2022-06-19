const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Model
const Author = require("../model/Author");

// Add author post method
router.post("/new", function (req, res, next) {
  const music = new Author(req.body);

  const promise = music.save();
  promise
    .then((music) => {
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get method for musics with authors
router.get("/", (req, res) => {
  const promise = Author.aggregate([
    {
      $lookup: {
        from: "musics",
        localField: "_id",
        foreignField: "author_id",
        as: "musics",
      },
    },
    {
      $unwind: {
        path: "$musics",
        preserveNullAndEmptyArrays: true, //  musiqasi yo'q bo'lgan authorni ham chiqaradi
      },
    },
  ]);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get method for author by id
router.get("/:author_id", (req, res) => {
  const promise = Author.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.author_id),
      },
    },
    {
      $lookup: {
        from: "musics",
        localField: "_id",
        foreignField: "author_id",
        as: "musics",
      },
    },
    {
      $unwind: {
        path: "$musics",
        preserveNullAndEmptyArrays: true, //  musiqasi yo'q bo'lgan authorni ham chiqaradi
      },
    },
  ]);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Update method for author by id
router.put("/:author_id", (req, res) => {
  const promise = Author.findOneAndUpdate(req.params.author_id, req.body, {
    new: true,  //  yangilangan ma'lumotni yuboradi
  });

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Delete author by id
router.delete("/:author_id", (req, res) => {
    const promise = Author.findByIdAndDelete(req.params.author_id);
  
    promise
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router;
