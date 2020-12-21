const User = require("../Models/users");
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const RegisterRouter = express.Router();

RegisterRouter.get("/", (req, res) => {
  res.send("register here");
});

RegisterRouter.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashedpass,
    });
    user
      .save()
      .then((user) => {
        console.log(user);
        res.json({
          message: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message: "An error Occured",
          error: err,
        });
      });
  });
});

module.exports = RegisterRouter;
