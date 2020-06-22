import mongoose from 'mongoose';
import { mongoUrl } from './key';
 
const mongoConnect =()=>{
    try{
        mongoose.set('useCreateIndex',true);
        mongoose.connect( mongoUrl,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("connet to Mongo database")
    }
    catch(err){
        console.error(`error in database connection =  ${err}`)
    }
}

export default mongoConnect;