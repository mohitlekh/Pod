const express = require("express");
const app = express();
const port = 3000;
const IP = require("ip");
const axios = require("axios");
require("dotenv").config();

const nodemailer = require("nodemailer");

function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mohit@globalebrand.com", // Replace with your email address
      pass: "9921213321", // Replace with your Gmail App Password
    },
  });

  const mailOptions = {
    from: "mohit@globalebrand.com",
    to: "mohitlekh@gmail.com", // Replace with the recipient's email address
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email sending failed: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const URL =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=" +
  "db1901da96284b769d36f89ddfc30af3";

const sendAPIRequest = async (ipAddress) => {
  try {
    const apiResponse = await axios.get(URL + "&ip_address=" + ipAddress);
    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  const ipAddress = IP.address();
  const ipAddressInformation = await sendAPIRequest(ipAddress);

  // if (ipAddressInformation.length != 0) {
  await sendEmail(
    "IP Address Information",
    JSON.stringify(ipAddressInformation)
  );
  // }
  res.send(ipAddressInformation);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
