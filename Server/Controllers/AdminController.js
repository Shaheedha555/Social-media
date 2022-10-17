const jwt = require('jsonwebtoken')
// const User = require('../Models/User')
const Admin = require('../Models/admin')


const adminLogin = async(req,res,next)=>{
    try {
        
        console.log(' admin login route');
        const {email,password} = req.body
       
        const admin = await Admin.findOne({email})
        if(admin && password===admin.password){
            console.log('admin matched');
            let token = generateToken(admin._id)
            console.log(token);
            req.admin = admin
              
            res.json({
                token: token
            })
        }else{
            console.log('admin not matching');
            res.json({error:'invalid email or password'})
        }
    } catch (error) {
        next(error)
    }

}

const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn : '30d'})
} 

module.exports ={
    adminLogin
}