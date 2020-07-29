const express = require("express");
const { Router, response } = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const user = require("../models/user");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/register", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashPassword(req.body.password),
    gender: req.body.gender,
  });
  user.save((err) => {
    if (!err) {
      return res.status(200).json({
        body: req.body,
        success: true,
      });
    } else
      return res.status(400).json({
        success: false,
      });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;

  User.findOne({ username: username })
    .then((foundUser) => {
      if (comparePassowrd(req.body.password, foundUser.password)) {
        const token = generateToken(foundUser);
        const data = {
          userId: req.body.username,
          token: token,
          expiresIn: 3600,
        };
        return res.status(200).json(data);
      }
      return res.status(400).json({ error: "Password not matched" });
    })
    .catch((err) => res.status(400).json({ error: "No username found" }));
});

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePassowrd = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

const generateToken = (user) => {
  const token = jwt.sign(
    {
      exp: 3600,
      data: {
        userId: user.username,
      },
    },
    "asfj;lsf"
  );
  return token;
};

module.exports = router;
