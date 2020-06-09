require("dotenv").config();
var express = require("express");
var app = express();
var router = express.Router();
var checker = require("../scraper");
var db = require("../config/db");
var fetch = require("node-fetch");
router.get("/", function (req, res, next) {
  res.render("home");
});
router.post("/", (req, res, next) => {
  app.set("data", req.body.productLink);
  res.redirect("/check");
});
router.get("/check", async (req, res, next) => {
  var value = await checker(app.get("data"));
  res.render("form", { data: value });
});

router.post("/check", async (req, res, next) => {
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
  var url = app.get("data");
  db.saveResult({
    email: req.body.email,
    link: url,
    price: req.body.price,
  });
});
router.get("/result", (req, res, next) => {
  res.render("result");
});
router.get("*", function (req, res, next) {
  res.send("kuch kaam nahi hai kya");
});
module.exports = router;
