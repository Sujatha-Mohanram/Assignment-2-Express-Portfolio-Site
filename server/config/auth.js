/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2

*/
let passport = require("./passport");

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log("user logged in******");
        
        return next();
    }
    else{
        req.flash('error_msg',"Please login to view this resource");
        res.redirect('/users/login');
    }
}

module.exports = { ensureAuthenticated};