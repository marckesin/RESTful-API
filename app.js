const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Importação das rotas
const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const endpointRouter = require('./routes/endpoint');

const app = express();

// Definição da view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do banco de dados
const dbConfig = require('./config/database.config').local;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  keepAlive: true,
  keepAliveInitialDelay: 30000
}).then(() => {
  console.log('Conectado ao banco de dados com sucesso.');
}).catch((err) => {
  console.log('Não foi possivel conectar ao banco de dados: ', err);
  process.exit();
});

// Definição das rotas
app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/articles/', endpointRouter);

// Error handler 
app.use(function(req, res, next) {
  next(createError(404));
});

 // Mensagens de erro no desenvolvimento
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;