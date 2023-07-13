const express=require('express');
const app=express();
const cors=require('cors');
const ConnecTomMngodb=require('./db');
const userRoutes=require('./auth/UserRoutes');
const placeRoutes=require('./auth/PlaceRoutes');
const bookingRoutes=require('./auth/BookingRoutes');
ConnecTomMngodb();
 
const port=4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes)
app.use('/api/place',placeRoutes)
app.use('/api/book',bookingRoutes)


app.post('/uploadBYLink',async(req,res)=>
{
    const {link}=req.body;
    const newName='photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/' +newName,
    });
    return res.json(newName);
})
                   



app.listen(port,()=>
{
    console.log(`app is listening on port ${port}`)
})