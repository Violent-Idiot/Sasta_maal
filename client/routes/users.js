var express = require("express");
var bcrypt = require("bcrypt");
var passport = require("passport");

var { saveUser } = require("../controller/dbConfig");

var router = express.Router();
/* GET users listing. */
router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  bcrypt
    .hash(req.body.pwd, 10)
    .then((hash) => {
      saveUser({
        email: req.body.email,
        password: hash,
      });
    })
    .catch((err) => console.log(err));
  res.redirect("/users/login");
});
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/users/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect("/users/" + req.user.email + "/dashboard");
    });
  })(req, res, next);
});

router.get("/:id/dashboard", (req, res, next) => {
  console.log(req.session.passport.user);

  res.render("dashboard", { user: req.params.id });
});
module.exports = router;
