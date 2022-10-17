const mongoose = require('mongoose')

const database = async ()=>{
    try {
        console.log('trying');
        await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
       }) 
       console.log('db connected successfully');

    } catch (error) {
        console.log(error.message);
    }
     
      
} 

module.exports = database