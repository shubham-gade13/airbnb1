const express=require('express');
const router=express.Router();
const Place=require("../models/PlaceModel");
const jwt=require('jsonwebtoken');
const jwt_secrete="hello_everyone"
const imageDownloader=require('image-downloader')
// create new place
router.post("/createplace",async(req,res)=>
{
    console.log(req.body);
    const token=req.header('token');
    
    if(!token)
    {
        return res.json({status:false,msg:"please loggin to add place"});
    }

    const data=jwt.verify(token,jwt_secrete);
    const id=data.id;


    const {price,title,address,photos,perks,description,checkIn,checkOut,maxGuests}=req.body;
  
    const place=await Place.create({
        owner:id,
        price,title,address,photos,perks,description,checkIn,checkOut,maxGuests
    });

    return res.json({status:true,place});
});

router.get("/getUserAddedPlaces",async(req,res)=>
{
    const token=req.header('token');
    if(!token)
    {
        return res.json({status:false,msg:"please loggin to see added place"});
    }

    const data=jwt.verify(token,jwt_secrete);
    const id=data.id;

    const allPlaces=await Place.find({owner:id});

    return res.json({status:true,allPlaces});

    
})

router.get("/getplace/:id",async(req,res)=>{

    
    const id=req.params.id;
    const place=await Place.findById(id);
    
    return res.json({status:true,place});
    
    
})
router.post("/edit",async(req,res)=>
{
    
       
    const placeid=req.body.id;
     const {price,title,address,description,perks,checkIn,checkOut,maxGuests}=req.body;
   
    
    const token=req.header('token');
    if(!token)
    {
        return res.json({status:false,msg:"please loggin to edit place"});
    }
    
    const data=jwt.verify(token,jwt_secrete);
    const id=data.id;
    
    const place=await Place.findById(placeid);


    const placeOwnerId=place.owner.toString();
        
    if(placeOwnerId===id)
    {
        const temp=await Place.findByIdAndUpdate(place._id,{$set:{
            title:title,description:description,checkIn:checkIn,checkOut:checkOut,
            maxGuests:maxGuests,address:address,price:price
        }},{new:true});

         
        return res.json({status:true,temp});
        
    }    
    else{
        return res.json({status:false,msg:"unauthorized access"});

    }
    
    
})

//getallplaces

router.get("/getallplaces",async(req,res)=>
{
    const places=await Place.find();

    return res.json({places});
})

router.post('/uploadBYLink',async(req,res)=>
{
    const {link}=req.body;
    const newName='photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/' +newName,
    });
    res.jaon(newName);
})
 
module.exports=router;