const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    comment: {
      type:String,
    },
    rating: {
  type:Number,
  min:1,
  max:5

    },
    createAt:{
        type:Date,
        default:Date.now()
    }
  });
  
module.exports= mongoose.model("reviews", ReviewSchema);
