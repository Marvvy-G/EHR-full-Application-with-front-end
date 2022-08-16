const mongoose = require("mongoose");

const vitalSchema = new mongoose.Schema({
    temperature: String,
    bloodpressure: String,
    pulse: String,
    oxygensat: String,
    heartrate: String,
 }, {timestamps:true});

 module.exports = mongoose.model("Vital", vitalSchema);