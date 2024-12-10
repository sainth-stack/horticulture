const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.post("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Define a GET route for all other paths
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server on port 4000
app.listen(4000, () => {
  console.log("Server is running port 4000");
});
