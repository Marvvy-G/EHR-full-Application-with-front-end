const router = require("express").Router();
   
const
products = require("../models/products"),
Patient = require("../models/patients"),
labProduct      = require("../models/labProducts"),
labOrders       = require("../models/labOrders"),
vital = require("../models/vital"),
visit = require("../models/visit"),
lab = require("../models/lab")

router.get("/showpatients", async (req, res) => {
    //Get all patients
    try{
        const patients = await Patient.find().populate("visit vital lab").exec();
        res.render("docshowpatients", {patients: patients});
        console.log(patients)
    } catch(err){
        console.log(err);
    }
  });

// router.get("/showpatients/:id", verifyTokenAndAuthorization, async (req, res) => {

//   try {
//     const Patient = await Patient.findById(req.params.id)
//   }
// })


router.get("/showpatients/:id", function(req, res){
  Patient.findById(req.params.id).populate("visit vital lab").exec(function(err, patient){
        if (err){ 
            console.log(err);
        } else {
             products.find({}, (err, products)=>{
              console.log(products)
              if (err){
                res.status(200).json(err);
              } else {
                labProduct.find({},(err, labProduct) => {
                  console.log(labProduct)
                  if (err){
                      console.log(err);   
                } else
                {
                  labOrders.find({}, (err, labOrders) => {
                    console.log(labOrders)
                      if(err){
                          console.log(err);    
              } else {
                res.render("patient", {patient : patient, vital:vital, visit: visit, lab:lab, products: products, labProduct: labProduct, labOrders: labOrders});
              }
          });
        }
      });
      }
    }); }
    })
  });

module.exports = router