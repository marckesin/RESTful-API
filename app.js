require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mounRoute = require("./routes/index");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return;
  })
  .catch(err => {
    throw err;
  });

mounRoute(app);

app.listen(port);
