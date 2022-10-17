/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2
*/
var express = require('express');
var router = express.Router();
var passport = require('passport');
let User = require("../models/User"); 
let indexController = require('../controllers/index');

let {ensureAuthenticated}=require('../config/auth');

/* Display Contact List Page*/
router.get('/businesscontacts',ensureAuthenticated,indexController.displayBusinessContactListPage);


/* GET home page. */
router.get('/', indexController.displayHomePage);
/* GET home page. */
router.get('/home', indexController.displayHomePage);
/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);
/* GET Projects page. */
router.get('/projects', indexController.displayProjectPage);
/* GET Services page. */
router.get('/services', indexController.displayServicesPage);
/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);


module.exports = router;
