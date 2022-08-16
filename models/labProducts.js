const mongoose = require("mongoose");

const labProductSchema = new mongoose.Schema({
    testtype: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
},
{
    timestamp: true 
});

module.exports = mongoose.model("labProduct", labProductSchema)