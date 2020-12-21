const express = require("express");
const axios = require("axios");
const APP_ID = require("../default").APP_ID;
const APP_KEY = require("../default").APP_KEY;

const RecipeRouter = express.Router();

RecipeRouter.get("/", (req, res) => {
  res.send("It is working");
});

RecipeRouter.get("/:query", async (req, res) => {
  const search = req.params.query;
  try {
    axios
      .get(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        res.json(response.data);
      });
  } catch (error) {
    console.error(error);
  }
});

module.exports = RecipeRouter;
