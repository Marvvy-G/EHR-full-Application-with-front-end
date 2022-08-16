const router = require("express").Router();
const { query } = require("express");
const Product = require("../models/products");
const{  verifyToken, 
        verifyTokenAndAuthorization, 
        verifyTokenAndAdmin 
    } = require("./verifyToken");
//for pharmacy
//CREATE
router.post("/pharmacy", async(req, res) =>{
    const newProduct = new Product(req.body)

try{
    const savedProduct =await newProduct.save();
    res.redirect("/api/products/pharmacy");
    console.log(savedProduct)
} catch(err){
    console.log(err)
};
});

// //UPDATE a PRODUCT
router.put("/:id",  async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            }, {new: true});
            res.redirect("/api/products/pharmacy");
        } catch(err){
            res.status(500).json(err)
        } return;
    });
    
    
    //DELETE
    router.post("/:id", async(req, res) => {
        try{
            await Product.findByIdAndDelete(req.params.id)
            res.redirect("/api/products/pharmacy");
        } catch(err){
            res.status(500).json(err)
        }
    });

//GET SELECTED PRODUCT
router.get("/pharmacy/find/:id", async(req, res) => {
    try{
        const Products = await Product.findById(req.params.id);
        res.status(200).json(Products);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET ALL PRODUCTS
router.get("/pharmacy", async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory],
            },
        });
        } else {
            products = await Product.find();
        }
        res.render("pharmacy/alldrugs", {products: products})
    } catch(err){
        res.status(200).json(err)
    }
});

module.exports = router;