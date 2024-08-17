const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Connected</h1>");
});

const contactRoute = require("./routes/contacts");
app.use("/contacts", contactRoute);

app.listen(port, () => {
  console.log("Serveur is Online");
});
