const express = require("express");
const path = require("path");

const app = new express();

app.use(express.static(path.join(__dirname, "../client")));
app.listen(12345, () => {
  console.log("Potatoes READY !");
});
