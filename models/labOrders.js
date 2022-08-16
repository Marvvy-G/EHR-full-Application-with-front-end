const mongoose = require("mongoose");

const labOrderSchema = new mongoose.Schema({
    amount:{
        type: Number,
        require: true
    },
    userId: {
        type: String,
        required: true, 
        unique:true
    }, 
    patientId: {
      type: String,
      required: true
    },
    labProducts: {
        labProductId:{
            type: String
        },
        quantity:{
            type: Number,  
        }
    }
},
{
    timestamp: true 
});

module.exports = mongoose.model("labOrder", labOrderSchema)