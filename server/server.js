const express = require("express");
const path = require("path");

const app = new express();

const { APP_PORT, PORT } = process.env;
const port = APP_PORT || PORT || 12345;

app.use(express.static(path.join(__dirname, "../client")));
app.listen(port, () => {
  console.log("Potatoes READY ! => " + port);
});
