const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb+srv://MEZES:3654811@cluster0.vccwa.mongodb.net/music?retryWrites=true&w=majority");

  mongoose.connection.on("open", () => {
    console.log("MongoDBga ulandi!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MongoDBga ulanishda xato yuz berdi", err);
  });
};

