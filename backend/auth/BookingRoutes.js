const express=require('express');
const router=express.Router();
const Booking = require("../models/Booking")
var jwt=require('jsonwebtoken');
   

const jwt_secrete="hello_everyone";


  //book place for logged in user
router.post("/booking",async(req,res)=>
{
        

     const token=req.header('token');
     try { 
          if(!token)
          {
          return res.json({status:false,msg:"please loggin to add place"});
          }
     
          const data=jwt.verify(token,jwt_secrete);
          const id=data.id;

     
       
     let booking=req.body;
     booking={...booking,user:id};
     
     
        const booked=await Booking.create(booking);
        if(booked)
        {
         return res.json({status:true,booked});
        }
        
        return res.json({status:false,msg:"error in booking"});
     } catch (error) {
          
          return res.json({status:false,msg:"internal server error"});
     }
    
})



// get all booked places by user
router.get("/getuserbookings",async(req,res)=>
{
     const token=req.header('token');
     if(!token)
     {
         return res.json({status:false,msg:"please see your bookings"});
     }
 
     const data=jwt.verify(token,jwt_secrete);
     const id=data.id;

     try {

          const allUersBookings=await Booking.find({user:id}).populate('place');
             
          return res.json({status:true,allUersBookings});
     } catch (error) {
          
          return res.json({status:false,error});
     }

    

})

module.exports=router