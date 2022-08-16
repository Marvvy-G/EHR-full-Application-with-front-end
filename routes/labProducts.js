const router = require("express").Router();
const { query } = require("express");
const labProduct = require("../models/labProducts");

router.get("/newlab", function(req, res){
    res.render("lab/newlabtest")
})
//CREATE
router.post("/lab", async(req, res) =>{
    const newlabProduct = new labProduct(req.body)
try{
    const savedlabProduct =await newlabProduct.save();
    res.redirect("/api/labProducts/lab")
} catch(err){
    console.log(err)
};
});

// //UPDATE a PRODUCTS
router.put("/:id", async (req, res) => {
    try {
        const updatedlabProduct = await labProduct.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        }, {new: true});
        res.redirect("/api/labProducts/lab")
    } catch(err){
        res.status(500).json(err);
    } 
});

//DELETE
router.post("/:id", async(req, res) => {
    try{
        await labProduct.findByIdAndDelete(req.params.id)
        res.redirect("/api/labProducts/lab")
    } catch(err){
        res.status(500).json(err)
    }
});


//GET SELECTED PRODUCT
router.get("/lab/find/:id", async(req, res) => {
    try{
        const labProducts = await labProduct.findById(req.params.id);
        res.status(200).json(labProducts);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET ALL PRODUCTS
router.get("/lab", async(req, res) => {
    const qNew = req.query.new;
    try{
        let labproducts;

        if(qNew){
            labproducts = await labProduct.find().sort({createdAt: -1}).limit(5)
        } else 
         {
            labproducts = await labProduct.find();
        }
        res.render("lab/alltest", {labproduct:labproducts})
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;