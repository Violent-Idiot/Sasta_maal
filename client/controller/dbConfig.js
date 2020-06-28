require("../config/db");
const users = require("../model/users");
const people = require("../model/people");

// saving in DB

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

// UPDATING DB

const updateUser = async (id, record) => {
  try {
    console.log(record);
    await people.findByIdAndUpdate(id, {
      $push: {
        records: record,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePrice = async (id, price) => {
  try {
    await people.findOne({ "records._id": id }, async (err, result) => {
      if (err) console.log(err);
      else {
        for (const item of result.records) {
          if (item._id == id) {
            item.price = price;
            people.markModified("price");
            await people.save();
          }
        }
        // result.records.forEach((item) => {
        //   if (item._id == id) {
        //     item.price = price;
        //     await people.save();
        //   }
        // });
      }
    });
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
        // console.log(result);
        return result;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE DB

const deleteLink = async (id) => {
  try {
    await people.update(
      {},
      {
        $pull: {
          records: {
            _id: id,
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  saveResult,
  findUrl,
  findEmail,
  saveUser,
  findIdUpdate,
  updateUser,
  deleteLink,
  updatePrice,
};
