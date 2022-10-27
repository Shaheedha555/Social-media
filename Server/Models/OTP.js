const mongoose = require('mongoose');
const OTPSchema = new mongoose.Schema({
    user : String ,
    otp : String ,
    createdAt : Date ,
    expiresAt : Date 
    
});
const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP ;