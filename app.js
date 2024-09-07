const express = require('express')
const app = express();
const port = 3000;
const mongoose=require ("mongoose");
const Listing=require("./models/listing.js")
const path=require("path");
const methodoverride=require("method-override")
const engine = require('ejs-mate');
const { error, clear } = require('console');
// const {listingSchema}=require("./schema.js")
const wrapAsync=require("./utility/wrapasync.js")
const ExpressError=require("./utility/error.js");
const reviews= require("./models/review.js");
const review=require("./routes/review.js")
const listing=require("./routes/listing.js")
const user=require("./routes/user.js")


const session=require("express-session");
const flash=require("connect-flash");
//last edded
const passport=require("passport")
const localstrategy=require("passport-local")
const User= require("./models/user.js");
//ahi sudhi added
 
main().then(()=>{
    console.log("connected to database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}
 app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodoverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")));
 


const sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
}

// app.get("/",(req,res)=>{
//   res.send("hello")
// })

app.use(session(sessionOption));
app.use(flash());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
 next();
})

//last added

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/user",(req,res)=>{
  res.render("user.ejs")
})

// app.post("/demouser",async(req,res)=>{
//  let {email,username,password}= req.body;
//   let fackuser= new User({
//     email:email,
//     username:username
//   })
//   let registereUser=User.register(fackuser,`${password}`).then((data)=>{
//     console.log(data)
//     res.send("hello")

//   })
//   //res.send(registereUser)
// })
//ahi sudhi last added


app.use("/listings",listing)
app.use("/listings",review)
app.use("/",user)





//jyare code kaam n kare tyare nicheni line thi jya sudhi line na ave tya sudhi ni Comment dur karvi ane route file delete karvi
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//index route
// app.get("/listings",wrapAsync(async(req,res)=>{
// let alllistings= await Listing.find({});
// res.render("index.ejs",{alllistings});
// }))


// //edit

// app.get("/listings/edit/:id",wrapAsync(async(req,res)=>{
//   let {id}=req.params;
//  let listing= await Listing.findById(id);
//   res.render("edit.ejs",{listing});
// }))
// //UPDATE

// app.put("/listings/update/:id", wrapAsync(async (req,res)=>{
//   let {id}=req.params;
//   console.log(id)

//   //
//   if(!req.body){
//     throw new ExpressError(400,"send valid data please..");
//   }
//   let {listing}=req.body;
//   await Listing.findByIdAndUpdate(id,{...listing});
// res.redirect("/listings");
// }))
// //delete

// app.get("/listings/delete/:id",wrapAsync(async (req,res)=>{
//   let {id}=req.params;
//   await Listing.findByIdAndDelete(id);
//   res.redirect("/listings");
// }))



// //new//

// app.get("/listings/add",(req,res)=>{
//   res.render("new.ejs");
// })

// app.post("/listings",wrapAsync(async(req,res,next)=>{

//  // let result=listingSchema.validate(req.body);
//  // console.log(result)

//   if(!req.body){
//     throw new ExpressError(400,"send valid data please..");
//   }

//     let {listing}=  req.body;
//     console.log(listing);

//      let newlisting=new Listing(listing);
//      await newlisting.save();
//      res.redirect("/listings")
    
 
//  //next(new ExpressError(404,"PLEASE ENTER TRUE DATA PLEASE TRY AGAIN....")

  
// }))

// //show routes//..

    
// app.get("/listings/:id",wrapAsync(async(req,res)=>{
//   let {id}=req.params;
//  const listing= await Listing.findById(id).populate("reviews")
// res.render("show.ejs",{listing});
// }))




// app.use((err,req,res,next)=>{
//   next( new ExpressError(404,"PLEASE ENTER TRUE DATA PLEASE TRY AGAIN...."))

// })

//comment part ...................................


// app.post("/listings/review/:id",wrapAsync(async(req,res)=>{
// let listing=await Listing.findById(req.params.id)
// let id=req.params.id
//   let review=req.body;
//   console.log(review)
//   let newreview= new reviews(review);
//     listing.reviews.push(newreview);
// await newreview.save()
// await listing.save()
// res.redirect(`/listings/${id}`)
// }))

// app.delete("/listing/:id/review/:reviewid",wrapAsync(async(req,res)=>{
//   let {id,reviewid}=req.params;
//   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}}).then((res)=>{
//  console.log(res)
//   })
//   await reviews.findByIdAndDelete(reviewid)
//   res.redirect(`/listings/${id}`)
// })

// )


//ahi sudhi
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






////error part//////


 app.all("*",(req,res,next)=>{
   next( new ExpressError(404,"page not found"))

 })

app.use((err,req,res,next)=>{

 let {status=404,message}=err;
 console.log(err)
res.render("error.ejs",{err})  
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
