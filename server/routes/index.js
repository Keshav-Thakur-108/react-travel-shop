const express = require("express");
const { Router, response } = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", (req, res) => {
  const token = req.body;
  const decoded = jwt.verify(token.token, "asfj;lsf", (err, decoded) => {
    if (err) console.log(err);
    else return decoded;
  });
  console.log(new Date(decoded.exp * 1000).toTimeString());

  res.json(token);
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
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: {
        userId: user.username,
      },
    },
    "asfj;lsf"
  );
  return token;
};

const decodeToken = (token) => {
  jwt.verify(token, (err, decoded) => {
    if (err) {
      return { success: false };
    } else return decoded;
  });
};

module.exports = router;
