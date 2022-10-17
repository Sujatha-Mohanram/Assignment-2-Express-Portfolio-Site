/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2

*/
 express = require('express');
let router = express.Router();
//connect to businesscontac model
let User = require("../models/User");
//let {ensureAuthenticated} = require('../config/auth');


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
  }

  module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About Us' });
  }
  module.exports.displayProjectPage = (req, res, next) => {
    res.render('projects', { title: 'Projects' });
  }
  module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services' });
  }
  module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact Me' });
  }
  module.exports.displayBusinessContactListPage =(req,res,next)=>{
    User.find( (err,businessContactList) =>{
      if(err)
      {
          return console.error(err);
      }
      else
      {
            console.log(businessContactList);
            res.render('businesscontacts',{
              name: req.user.name,
              title: 'Business Contacts',
              BusinessContactList: businessContactList
            });
      }
  });
  };