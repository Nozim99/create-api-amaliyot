const express = require("express");
const router = express.Router();

// Model
const Music = require("../model/Music");

// Get all music
router.get("/all", (req, res) => {
  const promise = Music.find({});
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

// Add music post method
router.post("/", function (req, res, next) {
  // const { title, category, country, year, spotify_score } = req.body;

  // const music = new Music({
  //   title: title,
  //   category: category,
  //   country: country,
  //   year: year,
  //   spotify_score: spotify_score,
  // });

  const music = new Music(req.body);

  const promise = music.save();
  promise
    .then((music) => {
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});

//  Get music by id
router.get("/:music_id", (req, res) => {
  const promise = Music.findById(req.params.music_id);
  promise
    .then((music) => {
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Update music by id
router.put("/:music_id", (req, res) => {
  const promise = Music.findOneAndUpdate(
    req.params.music_id, //  shu musicni pastdagiga o'zgartiradi
    req.body,
    {
      new: true, //  o'zgartirilgan ma'lumotni ko'rsatadi, bo'lmasa eskisini
    }
  );
  promise
    .then((music) => {
      if (!music) res.json("Topilmadi");
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Delete
router.delete("/:music_id", (req, res) => {
  const promise = Music.findOneAndDelete(req.params.music_id);
  promise
    .then((music) => {
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Music between two years
router.get("/between/:start_year/:end_year", (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Music.find({
    year: { $gte: start_year, $lte: end_year },
  });
  promise
    .then((music) => {
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Music between two spotify_score
router.get("/point/:start/:end", (req, res) => {
  const { start, end } = req.params;
  const promise = Music.find({
    spotify_score: { $gte: start, $lte: end },
  })
    .limit(10)
    .sort({ spotify_score: 1 });  //  o'sish tartibida. -1 bo'lsa kamayish tartibida

  promise
    .then((music) => {
      res.json(music);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
