require("dotenv").config();
var express = require("express");
var router = express.Router();
var db = require("../config/db");
var fetch = require("node-fetch");
router.get("/", function (req, res, next) {
  res.render("form");
});
router.get("*", function (req, res, next) {
  res.send("kuch kaam nahi hai kya");
});

router.post("/", async (req, res, next) => {
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
  db.saveResult(req.body);
  // res.send("info saved");
});
module.exports = router;
