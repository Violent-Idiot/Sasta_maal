const transporter = require("../config/emailConfig");

var mailer = async (price, email, orgPrice, link) => {
  let info = await transporter.sendMail({
    from: '"automailer" <yo@yo.com>', // sender address
    to: email, // list of receivers
    subject: "Price has reduced", // Subject line
    text: `Price has reduced from ${orgPrice} to ${price} please hurry and here's the link ${link}`, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  });
  console.log("Email send");

  console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
module.exports = mailer;
