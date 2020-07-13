var isAuth = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please log in");
    res.redirect("/");
  }
};
module.exports = isAuth;
