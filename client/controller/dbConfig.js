require("../config/db");
const users = require("../model/users");

const saveResult = (result) => {
  try {
    const newUser = new users(result);
    return newUser.save().catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
const findUrl = () => {
  try {
    return users.find({}, (err, results) => {
      if (err) throw err;
      else {
        return results;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const findEmail = (email, url) => {
  try {
    users.findOne({ email: email, link: url }, (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);

        return result;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { saveResult, findUrl, findEmail };
