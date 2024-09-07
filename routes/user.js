const express = require('express')
const router = express.Router();
const User= require("../models/user.js");
const wrapAsync=require("../utility/wrapasync.js");
const passport = require('passport');



router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

router.post("/signup",wrapAsync(async(req,res)=>{

    try {
        let {email,username,password}= req.body;
     let fackuser= new User({
       email:email,
       username:username
     })
     let registereUser= await User.register(fackuser,`${password}`)
     console.log(registereUser);
     req.flash("success","welcome to wanderlust");
    res.redirect("/listings")
    } catch (error) {
        req.flash("error",error.message)
        res.redirect("/signup")
    }
    
   }))

   router.get("/login",(req,res)=>{
    res.render("login.ejs")
})


router.post("/login",passport.authenticate("local",{ failureRedirect:"/login",failureFlash:true}),(async(req,res)=>{

    req.flash("success","welcome to wanderlust");
    res.redirect("/listings")
   }))


module.exports=router;