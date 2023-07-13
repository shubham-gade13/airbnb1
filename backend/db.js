const mongoose=require('mongoose');


const server='127.0.0.1:27017';
let database='airbnb';


const ConnecTomMngodb=async()=>
{
     
    mongoose.set('strictQuery',false);

    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("db connected");
        

    } catch (error) {
        console.log('failed to connect to mongodb');
    }
}

module.exports=ConnecTomMngodb;

