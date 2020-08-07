const express = require('express');
const cors = require('cors');
const { handleError } = require('./modules/error');
// const path = require('path');
const bodyParser = require('body-parser');
// const db = json d stuff...

const usersRoutes = require('./routes/users.routes');
const categoriesRoutes = require('./routes/categories.routes');
const moviesRoutes = require('./routes/movies.routes');
const app = express();

//cors allowed from all
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//all other code should be here
// users
app.use('/api/users', usersRoutes);
// categoriesRoutes
app.use('/api/categories', categoriesRoutes);
// moviesRoute
app.use('/api/movies', moviesRoutes);

//end of all other code

//catch all errors and output {statusCode,message} back
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
