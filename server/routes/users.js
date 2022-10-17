/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2
*/
var express = require('express');
var router = express.Router();
let mongoose = require("mongoose");
let User = require("../models/User"); 
let bcrypt = require('bcryptjs');
let flash = require('connect-flash');
let passport = require('passport');

//user controller
let usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* Get Login screen */
 router.get('/login', usersController.displayLoginPage);
 //handle login
 router.post('/login',usersController.processLoginPage);
 /* Get Registration screen */
router.get('/register', usersController.displayRegisterPage);
//handle register
router.post('/register', usersController.processRegisterPage);




//logout handle
router.post('/', usersController.performLogout);
//Business contact functions



/* GET users listing. */
/*Get route for the business contact list page--READ Operation */
//router.get('/',usersController.displayUserList);



/*Get route for the display Business contact edit page--UPDATE Operation */
router.get('/editContact/:id', usersController.displayEditRegisterPage);

/*Post route for the processing the Business contact edit page--UPDATE Operation */
router.post('/editContact/:id',usersController.processEditRegisterPage);

/*Get route for the book delete page--DELETE Operation */
router.get('/delete/:id',usersController.performDelete);



module.exports = router;
