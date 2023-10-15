const express = require("express");
const app = express();

app.get("/check", (req, res) => {
  const userIP = req.socket.remoteAddress;
  res.send(`Your IP address is: ${userIP}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
