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
  "https://ipgeolocation.abstractapi.com/v1/?api_key=" + process.env.API_KEY;

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
  // let ipAddressInformation = {
  //   ip_address: "192.168.0.105",
  //   city: null,
  //   city_geoname_id: null,
  //   region: null,
  //   region_iso_code: null,
  //   region_geoname_id: null,
  //   postal_code: null,
  //   country: null,
  //   country_code: null,
  //   country_geoname_id: null,
  //   country_is_eu: null,
  //   continent: null,
  //   continent_code: null,
  //   continent_geoname_id: null,
  //   longitude: null,
  //   latitude: null,
  //   security: { is_vpn: false },
  // };
  await sendEmail(
    "IP Address Information",
    JSON.stringify(ipAddressInformation)
  );
  res.send(ipAddressInformation);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
