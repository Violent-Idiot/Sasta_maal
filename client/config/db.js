require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const saveResult = (result) => {
  try {
    const users = require("../model/users");
    const newUser = new users(result);
    return newUser.save().catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
module.exports = saveResult;
