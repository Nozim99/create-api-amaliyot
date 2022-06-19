const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  surname: String,
  bio: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("author", AuthorSchema);
