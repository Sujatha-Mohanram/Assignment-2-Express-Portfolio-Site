/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2

*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('../routes');
var mongoose = require('mongoose');
let expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
require('./passport')(passport);


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');


var app = express();

//db
let db = require('./db').MongoURI;
mongoose.connect(db,{ useNewUrlParser:true})
.then(() => console.log('MongoDB connected....'))
.catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("view options", { layout: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname,'../../node_modules')));


//session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  }));
  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());
//global variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.use((req,res,next)=>{
  res.locals.username = req.user.name;
})
module.exports = app;
