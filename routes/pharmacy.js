const router = require("express").Router();
const Order = require("../models/order");
const
Patient = require("../models/patients");

router.get("/", function(req, res){
    res.render("pharmacy/pharmacy")
})

router.get("/showpatients",function(req, res){
    //get patients for pharmacist
    Patient.find({}, function(err, allPatients){
        if(err){
            res.status(200).json(err);
        }  else {
            res.render("pharmacy/pharmacydatabase", {patients: allPatients});
        }
        });
});


router.get("/showpatients/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        res.render("pharmacy/onepatient", {patient: patient})
        if (err){ 
            console.log(err);
        } 
    });
});
//Get patient prescription
router.get("/findpatient/:patientId", async (req, res) => {
    try{
        const orders = await Order.find({patientId: req.params.patientId});
        
        res.render("pharmacy/orders",{ Order : orders} )
    } catch(err){
        res.status(200).json(err)
    }
});



module.exports = router        