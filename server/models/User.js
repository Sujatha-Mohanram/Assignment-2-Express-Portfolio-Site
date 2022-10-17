/*
Student Number : 301152761
Student Name: Sujatha Mohanram
Assignment : 2

*/
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', userSchema);
module.exports = User;