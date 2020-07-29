const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./config/key");

const routes = require("./routes");
const { dirname } = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connnected"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use("/api", routes);
// app.get("/", (req, res) => {
//   res.send("HEllow");
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening");
});
