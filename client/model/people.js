var mongoose = require("mongoose");
// const recordSchema = new mongoose.Schema({
//   link: {
//     type: String,
//     default: null,
//   },
//   price: {
//     type: Number,
//     default: null,
//   },
// });
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  records: [
    {
      name: {
        type: String,
        default: null,
      },
      link: {
        type: String,
        default: null,
      },
      price: {
        type: Number,
        default: null,
      },
    },
  ],
});
module.exports = mongoose.model("peoples", userSchema);
