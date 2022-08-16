const mongoose = require("mongoose");
const Lab = require("./lab");
const Vital = require("./vital")
const Visit = require("./visit");

const medicationSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    nurse: { type: mongoose.Schema.ObjectId, ref: 'User' },
    miscText: { type: String }
}, { timestamps: true })

const patientSchema = new mongoose.Schema({
    photo: String,
    name: String,
    id: Number,
    age: Number,
    address: String,
    number: Number,
    lastvisit: String, 
    gender: String,
    bloodgroup: String,
    genotype : String,
    underlyingillness : String,
    medications: [medicationSchema],
    password: {
        type: String,
        required: true,
    },
    visit: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit"
        }
    ],
    vital: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vital"
        }
    ],
    lab: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lab"
        }
    ],
    labOrder: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "labOrder"
        }
    ]
  
},  { timestamps: true}
);

module.exports = mongoose.model("Patients", patientSchema);
