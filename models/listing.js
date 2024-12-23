const mongoose = require('mongoose')
const Review = require('./review.js')
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        image:
        {
            url:String,
            filename:String,
        },
        category:{
            type:String,
        },
        price:{
            type:Number
        },
        location:{
            type:String
        },
        country:{
            type:String
        },
       
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
     reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
     ],
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
     },
    }
)
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id :{$in:listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;
