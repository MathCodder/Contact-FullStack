const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

const contactRoute = require("./routes/contacts");
app.use("/api/contacts", contactRoute);

app.listen(port, () => {
  console.log("Serveur is Online");
});
