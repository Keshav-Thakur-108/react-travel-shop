const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./config/key");

const routes = require("./routes");
const productRoutes = require("./routes/product");

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

app.use("/uploads", express.static("uploads"));

app.use("/api/users", require("./routes/users"));
app.use("/api/product", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening");
});
