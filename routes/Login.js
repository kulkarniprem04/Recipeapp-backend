const User = require("../Models/users");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const { json } = require("express");

const LoginRouter = express.Router();

LoginRouter.get("/", (req, res) => {
  res.json("Login here");
});

LoginRouter.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err);
            res.json({
              error: err,
            });
          }
          if (result) {
            res.json({
              message: "Login Successful",
            });
          } else {
            res.json({
              message: "Password does not match",
            });
          }
        });
      } else {
        res.json({
          message: "No user Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err,
      });
    });
});

module.exports = LoginRouter;
