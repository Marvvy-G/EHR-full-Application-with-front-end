const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
    test: String,
    testResult: String,
    price: Number,
    patientId: {
        type: Number,
        required: true
    },
    labOrders: [
        {
            
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "LabOrder"
           
        }
    ]
});

module.exports = mongoose.model("Lab", labSchema);