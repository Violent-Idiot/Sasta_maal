var mongoose = require("mongoose");
require("./record");
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
      type: mongoose.Types.ObjectId,
      ref: "records",
      // name: {
      //   type: String,
      //   default: null,
      // },
      // link: {
      //   type: String,
      //   default: null,
      // },
      // price: {
      //   type: Number,
      //   default: null,
      // },
    },
  ],
});
module.exports = mongoose.model("peoples", userSchema);
