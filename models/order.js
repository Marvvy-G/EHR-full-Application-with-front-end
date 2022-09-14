const mongoose = require("mongoose");

//Order drugs schema


const OrderSchema = new mongoose.Schema({
    amount:{
        type: Number,
        require: true
    },
    userId: {
        type: String,
        required: true, 
        unique:true
    },
    patientId:{
        type: String,
        required: true
    },
    products:[ 
        {
    productId: {
           type: String
        },
    productName: {
        type: String
    },
       quantity:{
           type: Number,
      },
    dosage_type: {
        type: String,
        required: true, 
    },
    dose_quantity: {
        type: String,
        require: true
    }
    }
],
status: {type: String, default: "pending"}
},
{
    timestamp: true 
});

module.exports = mongoose.model("Order", OrderSchema) 