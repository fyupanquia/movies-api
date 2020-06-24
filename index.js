//const fs = require('fs');
//const path = require('path')
const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const authApi = require('./routes/auth');
const moviesAPI = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');
const bodyParser = require('body-parser');
//const morgan = require("morgan")
/*
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/json', function(req, res) {
  res.json({ hello: 'world' });
});
*/

app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(morgan('combined', { stream: accessLogStream }))

authApi(app);
moviesAPI(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
  //const debug = require('debug')('app:server'); //ok
  //debug(`Listening http://localhost:${config.port}`)
});
