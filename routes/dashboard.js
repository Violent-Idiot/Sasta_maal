var express = require("express");

var checker = require("../controller/productCheck");
var {
  findIdUpdate,
  updateUser,
  deleteLink,
  updatePrice,
} = require("../controller/dbConfig");
var isAuth = require("../controller/auth");

var app = express();
var router = express.Router();

router.get("/dashboard", isAuth, async (req, res, next) => {
  let userId = await findIdUpdate(req.session.passport.user);
  // console.log(userId);
  let isLogin = req.isAuthenticated();
  console.log(isLogin);
  app.set("user", userId.email);
  res.render("dashboard", { userId, isLogin });
});

router.post("/dashboard", isAuth, (req, res, next) => {
  let user = app.get("user");
  // app.set("data", req.body.productLink);
  // console.log(req.body.productLink);
  app.set("data", req.body.productLink);
  res.redirect(`/${user}/check`);
});

router.get("/check", isAuth, async (req, res, next) => {
  let user = app.get("user");
  var value = await checker(app.get("data"));
  app.set("name", value[0]);
  var login = req.isAuthenticated();
  res.render("form", { data: value, login, action: `${user}/check` });
});

router.post(`/check`, (req, res, next) => {
  let user = app.get("user");

  console.log(req.body.price);
  var record = {
    name: app.get("name"),
    link: app.get("data"),
    price: req.body.price,
  };
  // console.log(record);
  updateUser(req.session.passport.user, record);
  res.redirect(`/${user}/dashboard`);
});
router.post(`/delete`, (req, res, next) => {
  let user = app.get("user");
  console.log(req.body.helo);
  deleteLink(req.body.helo);
  res.redirect(`/${user}/dashboard`);
});
router.post("/update", (req, res, next) => {
  let user = app.get("user");
  // console.log(req.body);

  let { price, helo } = req.body;
  // console.log(price, helo);
  updatePrice(helo, price);
  res.redirect(`/${user}/dashboard`);
});
module.exports = router;
