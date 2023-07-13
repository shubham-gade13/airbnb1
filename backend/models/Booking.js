const mongoose=require('mongoose');

const BookinSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    place:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Place"
    },
    checkIn:{type:Date,
        require:true
    },
    checkOut:{
        type:Date,
        require:true
    },
    name:String,
    phone:String,
    price:String,
    guests:String

})

module.exports=mongoose.model('Booking',BookinSchema);
