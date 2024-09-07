const express = require('express')
const router = express.Router();
// const {listingSchema}=require("./schema.js")
const wrapAsync=require("../utility/wrapasync.js")
const ExpressError=require("../utility/error.js");
const Listing=require("../models/listing.js")




router.get("/",wrapAsync(async(req,res)=>{
    let alllistings= await Listing.find({});
    res.render("index.ejs",{alllistings});
    }))
   
    
    //edit
    
    router.get("/edit/:id",wrapAsync(async(req,res)=>{
      let {id}=req.params;
     let listing= await Listing.findById(id);
     if(!listing){
      req.flash("error","this listings is not exists");
      res.redirect("/listings")
}
      res.render("edit.ejs",{listing});
    }))
    //UPDATE
    
    router.put("/update/:id", wrapAsync(async (req,res)=>{
      let {id}=req.params;
      console.log(id)
    
      //
      if(!req.body){
        throw new ExpressError(400,"send valid data please..");
      }
      let {listing}=req.body;
      await Listing.findByIdAndUpdate(id,{...listing});
      req.flash("success","update successfully");
     res.redirect("/listings");
    }))
    //delete
    
    router.get("/delete/:id",wrapAsync(async (req,res)=>{
      let {id}=req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success","Delete successfully");
     res.redirect("/listings");
    }))
    
    
    
    //new//
    
    router.get("/add",(req,res)=>{
      res.render("new.ejs");
    })
    
    router.post("/",wrapAsync(async(req,res,next)=>{
    
     // let result=listingSchema.validate(req.body);
     // console.log(result)
    
      if(!req.body){
        throw new ExpressError(400,"send valid data please..");
      }
    
        let {listing}=  req.body;
        console.log(listing);
    
         let newlisting=new Listing(listing);
         await newlisting.save();
         req.flash("success","new listings created");
         res.redirect("/listings")
        
     
     //next(new ExpressError(404,"PLEASE ENTER TRUE DATA PLEASE TRY AGAIN....")
    
      
    }))
    
    //show routes//..
    
        
    router.get("/:id",wrapAsync(async(req,res)=>{
      let {id}=req.params;
     const listing= await Listing.findById(id).populate("reviews")
     if(!listing){
      req.flash("error","this listings is not exists");
      res.redirect("/listings")
}
    res.render("show.ejs",{listing});
    }))
    
    
    module.exports=router;