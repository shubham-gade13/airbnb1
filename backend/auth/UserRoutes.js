const express=require('express');
const router=express.Router();
const User=require('../models/UserModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const jwt_secrete="hello_everyone";


// create user
router.post('/signup',async(req,res)=>
{
    
    const {name,email,password}=req.body;
    try {
        
        let user=await User.findOne({email});
        
        if(user)
                {
                    return res.json({status:false,msg:"user with this email already exist"});
                }
                
                
                const salt=await bcrypt.genSalt(10);
                const secure_pass=await bcrypt.hash(password,salt);
                user=await User.create({
                    name,email, password:secure_pass
                })

                const token=jwt.sign({id:user._id},jwt_secrete)
        
                return res.json({status:true,msg:"user created succefully",user,token});
        
    } catch (err) {
        return res.json({status:false,err});
    }
    
   

});

//login
router.post("/login",async(req,res)=>
{
    
    try {
       const {password,email}=req.body;
        
       const user=await User.findOne({email});

       if(!user)
       {
        return res.json({status:false,msg:"user doesn not exits"});
       }
       const passcompare=await bcrypt.compare(password,user.password);

       if(!passcompare)
       {
        return res.json({status:false,msg:"incorrect password"});
       }

       const token=jwt.sign({id:user._id},jwt_secrete);

       return res.json({status:true,msg:"logged in successfully",token,user});
        
   } catch (error) {
      return res.send("internal server error occured");
   }
});

router.get("/getuser",async(req,res)=>
{
    const token=req.header('token');
    if(!token)
    {
        return res.json({msg:"token is found"});
    }

    const data=jwt.verify(token,jwt_secrete);
    const id=data.id;
    const user=await User.findById(id);


    return res.json({user});

})

module.exports=router;

