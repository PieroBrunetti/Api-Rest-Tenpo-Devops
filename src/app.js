const dotenv = require('dotenv');
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const addRouter = require('./routes/add')
const db = require("./models");
const app = express();
db.sequelize.sync();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(indexRouter);
app.use(authRouter);
app.use(addRouter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
module.exports = app;