const express = require('express')
const router = express.Router();
const { error, clear } = require('console');
// const {listingSchema}=require("./schema.js")
const wrapAsync=require("../utility/wrapasync.js")
const ExpressError=require("../utility/error.js");
const reviews= require("../models/review.js");
const Listing=require("../models/listing.js")


router.post("/review/:id",wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let id=req.params.id
      let review=req.body;
      console.log(review)
      let newreview= new reviews(review);
        listing.reviews.push(newreview);
    await newreview.save()
    await listing.save()
    req.flash("success","new reviews added");
    res.redirect(`/listings/${id}`)
    }))
    

router.delete("/:id/review/:reviewid",wrapAsync(async(req,res)=>{
      let {id,reviewid}=req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}}).then((res)=>{
     console.log(res)
      })
      await reviews.findByIdAndDelete(reviewid)
      res.redirect(`/listings/${id}`)
    })
    
    )

    module.exports=router;