// const users = require("../model/users");
const { findUrl } = require("../config/db");
const mailer = require("./mailer");

let priceCheck = (newPrice, url) => {
  if (newPrice < url.price) {
    console.log("price less");
    mailer(newPrice, url.email, url.price, url.link);
  } else {
    console.log("yoman");
  }
  // var url = findUrl();
  // url.forEach(item => {
  //   if(newPrice<item.price){
  //   }
  // });
  // for (const i of newPrice) {
  //   if (newPrice < i.price) {
  //   } else {
  //     continue;
  //   }
  // }
};
module.exports = priceCheck;
