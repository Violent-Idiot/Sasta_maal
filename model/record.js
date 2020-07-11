var mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "peoples",
  },
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  price: {
    type: Number,
  },
});
// const recordModel = mongoose.model("records", recordSchema);
// const arecord = new recordModel({
//   name: "hello",
//   link: "heduheud",
//   price: 123,
// });
// arecord.save();
module.exports = mongoose.model("records", recordSchema);
