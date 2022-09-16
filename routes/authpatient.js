const router = require("express").Router();
const Patient    = require("../models/patients");
const CryptoJS = require("crypto-js");
const{ verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const multer = require('multer');

const { upload } = require('../util/cloudinaryConfig');

router.get("/doctor/newpatient", (req, res)=>{
    res.render("doc/addnewpatient")
});

//ADD NEW PATIENT
router.post("/doctor/showpatients", 
            upload.single('photo'), 
            async (req, res)=>{
    const newPatient = new Patient({
         photo : req.file.path,
         name  : req.body.name,
         id    : req.body.id,
         age   : req.body.age,
         address : req.body.address,
         number : req.body.number,
         lastvisit: req.body.lastvisit,
         gender   : req.body.gender,
         bloodgroup : req.body.bloodgroup,
         genotype   : req.body.genotype,
         underlyingillness : req.body.underlyingillness,
         password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString(), 

    });
    try{
        const savedPatient = await newPatient.save();
        res.redirect("/api/doctor/showpatients")
        console.log(savedPatient)
       }
        catch(err)
       {
       console.log(err);
      }return;
 });

//GET LOGIN PAGE
router.get("/patient/login", (req, res)=> {
    res.status(500).json("patientlogin")
})

//LOGIN
router.post("/login", async(req, res) => {
    try{
        const patient = await Patient.findOne({id: req.body.id});
        !patient && console.log("wrong credentials")
        const hashedpassword = CryptoJS.AES.decrypt(
            patient.password,
            process.env.PASS_SEC);
            const Originalpassword = hashedpassword.toString(CryptoJS.enc.Utf8);
            Originalpassword !== req.body.password && 
            console.log("wrong credentials");

            const {password, ...others} = patient._doc;

            console.log({others});
            res.status(400).json("success");
    } catch (err) {
        console.log(err);
        return;
    }
});



module.exports = router