require("../config/db");
const users = require("../model/users");
const people = require("../model/people");
const saveResult = (result) => {
  try {
    const newUser = new users(result);
    return newUser.save().catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const saveUser = (result) => {
  try {
    const newPeople = new people(result);
    return newPeople.save().catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

// FINDING IN DB

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
    return users.findOne({ email: email, link: url }, (err, result) => {
      if (err) console.log(err);
      else {
        return result;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const findIdUpdate = (id) => {
  try {
    return people.findById(id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveResult, findUrl, findEmail, saveUser, findIdUpdate };
