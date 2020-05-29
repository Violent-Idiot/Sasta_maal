var express = require("express");
var router = express.Router();
var db = require("../config/db");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("form");
});
router.post("/", (req, res, next) => {
  // const email = req.body.email;
  // const address = req.body.link;
  // const price = req.body.price;
  console.log(req.body);

  db(req.body);
  // db.saveResult(req.body);
  res.redirect("/");
});
module.exports = router;
