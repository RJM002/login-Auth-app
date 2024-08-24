const ensureAuthentication = require('../Middlewares/Auth');

const router=require('express').Router();

router.get('/',ensureAuthentication,(req,res)=>{
    res.status(200).json([
        {
            name:"TV",
            price:1000
        },
        {
            name:"mobile",
            price:2000
        }
    ])
})

module.exports=router;