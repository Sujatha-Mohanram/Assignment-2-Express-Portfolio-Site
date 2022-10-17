/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2

*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let passport = require('passport');

var flash = require('express-flash');
var session = require('express-session');

//connect to businesscontac model
let User = require("../models/User");

// Login Functions
module.exports.displayLoginPage =(req, res, next) =>{
    res.render('login', { title: 'Login' });
  }
module.exports.processLoginPage = (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/businesscontacts',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req,res,next);
  }

//register functions
module.exports.displayRegisterPage =(req, res, next) =>{
    res.render('register', { title: 'Register' });
  }

module.exports.processRegisterPage = (req,res,next)=>{
    let {fullname,email,phone,name,password,password2} = req.body;
    
    let errors = [];
    if(!name || !email || !password || !password2 ||!fullname ||!phone)
    {
     errors.push({ msg:"Please fill in all fields"});
    }
    if(password !=password2)
     {
        errors.push({ msg: "Passwords do not match"}); 
     }
     if(password.length<6)
     {
         errors.push({msg:'Password should be at least 6 characters long'});
     }
  
     if(errors.length>0)
     {
         res.render('register',{
             errors,
             fullname,
             email,
             phone,
             password,
             password2,
             title: 'Register'
         });
     }else{
  
         User.findOne({name:name})
         .then(user => {
             if(user){
                 errors.push({msg:'Username is already registered'});
                 res.render('register',{
                     errors,
                     fullname,
                     email,
                     phone,
                     name,
                     password,
                     password2,
                     title:'Register'
                 });
             }
             else{
                 let newuser = new User({fullname,
                    email, 
                    phone,
                    name,                     
                    password
                 });
                 bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newuser.password,salt,(err,hash)=>{
                     if(err) throw err;
                     newuser.password = hash;
                     newuser.save()
                         .then(user =>{
                             req.flash('success_msg','You are now registered and can login');
                             res.redirect('/users/login');
                         })
                             .catch(err=> console.log(err));
                 }))
             }
             });
  
         }
     
  
  }


/*module.exports.displayUserList = (req,res,next) =>
{
    
    User.find( (err,usersList) =>{

        if(err)
        {
            return console.error(err);
        }
        else
        {
           
           console.log(usersList);
           res.render('users/list',{title:'Users', Users: usersList})
        }

});
}*/







module.exports.displayEditRegisterPage = (req,res,next) =>
{
    let id = req.params.id;
    
    User.findById(id, (err,UserstoEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('users/editContact', {title: 'Edit Registered User', Users: UserstoEdit, name:req.user.name});

        }
    });
} 
module.exports.processEditRegisterPage =  (req,res,next) =>
{
    let id = req.params.id;
    
    let updateUser = {};
    updateUser.name = req.body.name;
    updateUser.email = req.body.email;
    updateUser.phone = req.body.phone;
    updateUser.fullname = req.body.fullname;
    let filter = {"_id": id};
    console.log(id);
    User.updateOne(filter, updateUser, (err) =>{

       if(err)
        {
            
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/businesscontacts');
        }
    });
}

module.exports.performDelete =  (req,res,next) =>
{
    let id = req.params.id;
          
    User.findByIdAndDelete(id,(err)=>{
     
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
           
            res.redirect('/businesscontacts');
        }
   
    });
    
}
module.exports.performLogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){return next(err);}
    });
    
    req.flash('success_msg','You are successfully logged out');
    res.redirect('/users/login');
  };