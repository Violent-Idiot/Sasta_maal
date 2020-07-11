require("dotenv").config();
const mongoose = require("mongoose");
// const users = require("../model/users");

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
// const saveResult = (result) => {
//   try {
//     const newUser = new users(result);
//     return newUser.save().catch((err) => console.log(err));
//   } catch (error) {
//     console.log(error);
//   }
// };
// const findUrl = () => {
//   try {
//     // const query = users.find();
//     // return query;
//     return users.find({}, (err, results) => {
//       if (err) throw err;
//       else {
//         // return console.log(results.link);
//         return results;
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = { saveResult, findUrl };
