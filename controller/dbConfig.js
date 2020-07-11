require("../config/db");
const users = require("../model/users");
const people = require("../model/people");
const Record = require("../model/record");
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
    // console.log(record);
    // await people.findByIdAndUpdate(id, {
    //   $push: {
    //     records: record,
    //   },
    // });
    let newRecord = new Record({
      userId: id,
      name: record.name,
      link: record.link,
      price: record.price,
    });
    await newRecord.save().catch((err) => console.log(err));
    await people
      .findByIdAndUpdate(id, {
        $push: {
          records: newRecord._id,
        },
      })
      .exec();
  } catch (error) {
    console.log(error);
  }
};

const updatePrice = async (id, price) => {
  try {
    await Record.findByIdAndUpdate(id, {
      price,
    })
      .populate("peoples")
      .exec((err, res) => {
        console.log(res);
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

const findIdUpdate = async (id) => {
  try {
    return people
      .findById(id)
      .populate("records")
      .then((yo) => {
        return yo;
      });
  } catch (error) {
    console.log(error);
  }
};

// DELETE DB

const deleteLink = async (id) => {
  try {
    Record.findByIdAndRemove(id).exec();
    people
      .updateOne(
        {},
        {
          $pull: {
            records: id,
          },
        }
      )
      .exec();
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
