const router = require("express").Router();
const res = require("express/lib/response");
const labOrder = require("../models/labOrders");
const 
Patient = require("../models/patients"),
lab = require("../models/lab");


router.get("/showpatients", function(req, res){
    //get patients for pharmacist
    Patient.find({}, function(err, allPatients){
        res.render("lab/database", {patients: allPatients});
        if(err){
            res.status(200).json(err);
        }  
        });
});


router.get("/showpatients/:id/",function(req, res){
    Patient.findById(req.params.id).populate("labOrder").exec (function(err, patient){
        res.render("lab/onepatient", {patient: patient})
        if (err){ 
            console.log(err);
        }    
    });
});
//find laborders for a specific patient
router.get("/find/:patientId", async (req, res) => {
    try{
        const laborders = await labOrder.find({patientId: req.params.patientId});
        res.render("lab/orders", {labOrder: laborders})
        console.log(laborders)
    } catch(err){
        res.status(500).json(err)
    }
});

//Get patient lab results
router.get("/findlabresult/:patientId", async (req, res) => {
    try{
        const labs = await lab.find({patientId: req.params.patientId});
        res.render("lab/labresults", {lab: labs});
    } catch(err){
        console.log(err)
    }
});

// create lab results


module.exports = router