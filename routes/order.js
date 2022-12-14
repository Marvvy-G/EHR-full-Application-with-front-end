const router = require("express").Router();
const { query } = require("express");
const res = require("express/lib/response");
const Order = require("../models/order");
const{  verifyToken, 
        verifyTokenAndAuthorization, 
        verifyTokenAndAdmin 
    } = require("./verifyToken");
//For pharmacy
//CREATE
//add "/:id/order befor giving" and verifyToken,


router.post("/order", async(req, res) =>{
    const newOrder = new Order(req.body)

try{
    const savedOrder = await newOrder.save();
    console.log(savedOrder)
} catch(err){
    console.log(err)
}
})

//UPDATE a PRODUCTS
router.put("/:id", verifyTokenAndAdmin , async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedOrder); 
    } catch(err){
        res.status(500).json(err);
    } return;
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
});


//GET USER Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(500).json(orders);
    } catch(err){
        res.status(200).json(err)
    }
});

//Get patient prescription
router.get("/findpatient/:patientId", async (req, res) => {
    try{
        const orders = await Order.find({patientId: req.params.patientId});
        res.status(500).json(orders);
    } catch(err){
        res.status(200).json(err)
    }
});

// GET ALL PRODUCTS
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try{
        const orders = await Order.find();    
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err)
    }
});

//GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }}},
            {
            $project:{
            month: { $month: "$createdAt" },
        },}

    ]);
    res.status(200).json(income)
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;