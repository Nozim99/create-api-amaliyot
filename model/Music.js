const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
  author_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: String,
  counter: String,
  year: Number,
  spotify_score: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("music", MusicSchema);
