const mongoose=require('mongoose');


const PlaceSchema=new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    checkIn:String,
    checkOut:String,
    maxGuests:String,
    price:Number
});

module.exports=mongoose.model('Place',PlaceSchema);
