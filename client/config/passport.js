var localStrategy = require("passport-local");
var bcrypt = require("bcrypt");
var people = require("../model/people");

var auth = (passport) => {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      people.findOne({ email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "Email not register" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) console.log(err);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    people.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
module.exports = auth;
