const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Mongo_uri = require("./default").Mongo_uri;

const RecipeRouter = require("./routes/Recipe");
const RegisterRouter = require("./routes/Register");
const LoginRouter = require("./routes/Login");

mongoose
  .connect(Mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongodb Atlas connected"));
//const db = mongoose.connection;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/recipes", RecipeRouter);
app.use("/api/register", RegisterRouter);
app.use("/api/login", LoginRouter);

app.get("/api/", (req, res) => {
  res.json("it is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
