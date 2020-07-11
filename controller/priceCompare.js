const mailer = require("./mailer");

let priceCheck = (newPrice, url) => {
  if (newPrice < url.price) {
    console.log("YES");
    mailer(newPrice, url.email, url.price, url.link);
  } else {
    console.log("NO");
  }
};
module.exports = priceCheck;
