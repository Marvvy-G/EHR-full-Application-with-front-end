const router = require("express").Router();
const res = require("express/lib/response");
const Order = require("../models/order");
const lab = require("../models/lab")
const{ verifyToken, 
       verifyTokenAndAuthorization, 
       verifyTokenAndAdmin } 
       = require("./verifyToken");

router.get("/patient/:id", verifyToken, function(req, res){
    res.status(500).json("patient default page")
});

//Get patient prescription
router.get("/findpatient/:patientId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const orders = await Order.find({patientId: req.params.patientId});
        res.status(500).json(orders);
    } catch(err){
        res.status(200).json(err)
    }
});

//Get patient lab results
router.get("/findlab/:patientId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const lab = await lab.find({patientId: req.params.patientId});
        res.status(500).json(lab);
    } catch(err){
        res.status(200).json(err)
    }
});


// Add medication
router.post("/add-medication", async (req, res) => {
    try {
        const updatedPatient = await Patient.updateOne({ _id: req.body.patientId }, { $push: { medications: req.body.medication } });
        res.status(200).json(updatedPatient.acknowledged);

    } catch (err) {
        res.status(500).json(err)
    }
})

// Get medications given to patient by nurses
router.get("/get-medication", async (req, res) => {
    try {
        const query = {
            _id: req.query.patientId
        };

        const patient = await Patient.findOne(query)
            .populate({
                path: 'medications',
                populate: {
                    path: 'name',
                    select: {
                        name: 1,
                        dose_quantity: 1,
                        dosage_type: 1
                    }
                }
            })
            .populate({
                path: 'medications',
                populate: {
                    path: 'nurse',
                    select: { name: 1, _id: 1 }
                }
            }).exec();

        const result = patient.medications.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json({ medications: result });
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;