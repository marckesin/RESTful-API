require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const mounRoute = require("./routes/index");

const port = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso.");
  })
  .catch(err => {
    console.log("Não foi possivel conectar ao banco de dados: ", err);
    process.exit();
  });

mounRoute(app);

app.listen(port);
