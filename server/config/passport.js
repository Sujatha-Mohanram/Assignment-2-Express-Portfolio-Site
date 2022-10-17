/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2

*/
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let passport = require('passport');

//load user model
let User = require('../models/User');


module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'name'}, (name,password,done)=>{
        //match user
        User.findOne({name:name})
        .then(user =>{
            if(!user){
                return done(null,false,{message:'That username is not registered'})
            }

            //match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err)throw err;
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message:'Password incorrect'});
                }
            });
        })
        .catch(error=> console.log(error));
    }));
    
};
passport.serializeUser((user, done)=> {
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });


    

  