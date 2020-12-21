const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Mongo_uri = require("./default").Mongo_uri;

const RecipeRouter = require("./routes/Recipe");
const RegisterRouter = require("./routes/Register");

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

app.get("/api/", (req, res) => {
  res.json("it is working");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
