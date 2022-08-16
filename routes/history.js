const router = require("express").Router();
//Models
const
vital = require("../models/vital"),
visit = require("../models/visit"),
Patient = require("../models/patients"),
lab = require("../models/lab")

router.get("/show/showpatients", async (req, res) => {
    //Get all patients
    try{
        const patients = await Patient.find().populate("vital").exec();
        res.render("nurse/nursedatabase", {patients: patients});
        console.log(patients)
    } catch(err){
        console.log(err);
    }
  });

router.get("/nurse/showpatients/:id", function(req, res){
    Patient.findById(req.params.id).populate("vital").exec(function(err, patient){
        if(err){
            console.log(err);} else {
                res.render("nurse/dashboard", {patient : patient, vital:vital});
            }
    });
});

router.get("/nurse/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        res.render("nurse/nurse", {patient: foundPatient});
        if(err){
            console.log(err);
        } 
})
});
//create lab result
//check this route for that lab validation error
router.post("/lab/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
            lab.create(req.body, function(err, lab){
                if (err){
                    console.log(err)
                } else {
                    patient.save();
                    patient.lab.push(lab);
                    res.status(500).json(lab)
                }
            })
        }
    })
})

//create a visit
router.post("/visit/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if(err){
            console.log(err);
            res.status(200).json("redirect to index");
        } else {
            visit.create(req.body, function(err, visit){
                if (err){
                    console.log(err);
                }   else 
                {
                    patient.save();
                    patient.visit.push(visit);
                   res.status(500).json(visit);
                   
                }
            });
        }

    });
});
//create a vital
router.post("/vital/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
            vital.create(req.body, function(err, vital){
                if (err){
                    console.log(err)
                } else {
                    patient.save();
                    patient.vital.push(vital);
                    res.redirect("/api/history/nurse/showpatients/" + req.params.id)
                }
            })
        }
    })
});


//DELETE
router.post("/:id", async(req, res) => {
    try{
        await vital.findByIdAndDelete(req.params.id)
        res.redirect("/api/history/nurse/showpatients/" + req.params.id)
    } catch(err){
        res.status(500).json(err)
    }
});

router.get("/visit/:id", function(req, res){ 
    Patient.findById(req.params.id).populate("visit vital lab").exec(function(err, patient){
        res.status(500).json(patient);
        if(err){
            console.log(err);}
    });
});



module.exports = router;
