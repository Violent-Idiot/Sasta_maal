var mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  link: {
    type: String,
  },
  price: {
    type: Number,
  },
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  records: [recordSchema],
});

module.exports = mongoose.model("peoples", userSchema);
