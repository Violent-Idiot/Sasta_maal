require("dotenv").config();
var express = require("express");
var app = express();
var router = express.Router();
var checker = require("../controller/productCheck");
var { saveResult, findEmail } = require("../controller/dbConfig");
var fetch = require("node-fetch");
var isAuth = require("../controller/auth");

router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/features", (req, res, next) => {
  res.render("features");
});

router.post("/", (req, res, next) => {
  app.set("data", req.body.productLink);
  res.redirect("/check");
});

router.get("/check", async (req, res, next) => {
  var value = await checker(app.get("data"));
  var login = req.isAuthenticated();
  console.log(login);

  res.render("form", { data: value, login, action: "check" });
});

router.post("/check", async (req, res, next) => {
  let url = app.get("data");
  let check = await findEmail(req.body.email, url);
  console.log(check);

  if (!!check) {
    res.json({ success: false, msg: "We have Credentials" });
  } else {
    if (
      req.body.captcha === undefined ||
      req.body.captcha === "" ||
      req.body.captcha === null
    ) {
      res.json({ success: false, msg: "Please use Captcha" });
    }
    const key = process.env.KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    const body = await fetch(verifyUrl).then((res) => res.json());
    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: "falied" });
    }
    res.json({ success: true, msg: "Captcha passed" });
    // ifelse in db req.isAuthenticated()
    saveResult({
      email: req.body.email,
      link: url,
      price: req.body.price,
    });
  }
});

router.get("/result", (req, res, next) => {
  res.render("result");
});

// router.get("*", function (req, res, next) {
//   res.send("kuch kaam nahi hai kya");
// });

module.exports = router;
