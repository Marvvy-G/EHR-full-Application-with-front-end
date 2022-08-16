const router = require("express").Router();
const user = require("../models/user");
const CryptoJS = require("crypto-js");
const{ verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//UPDATE a User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
       req.body.password= CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString();
    } try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedUser); 
    } catch(err){
        res.status(500).json(err);
    } return;
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try{
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
})
//GET USER
router.get("/find/:id", async(req, res) => {
    try{
        const users = await user.findById(req.params.id)
        const{ password, ...others } = users._doc;

        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET ALL USERS
router.get("/",  async(req, res) => {
    try{
        const users = await user.find();
        res.status(500).json(users);
        console.log(users);
    } catch(err){
        res.status(200).json(err)
    }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await user.aggregate([
            {$match: {createdAt: { $gte: lastYear} }},
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            {$group:{
                _id: "$month",
                total: {$sum: 1}, 
            }}
        ]);
        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(err);
        }
});


module.exports = router;