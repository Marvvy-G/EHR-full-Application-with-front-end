const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    id:{
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    specialty: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },

    isAdmin: {
        type: Boolean,
        default: true
    },
},
{
    timestamp: true 
});

module.exports = mongoose.model("User", UserSchema);