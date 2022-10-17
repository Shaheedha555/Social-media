const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Models/user')
const { validationResult } = require('express-validator');

const userRegister = async(req,res,next)=>{

    try {
        console.log('register route');
        const {name,email,contact,password,username,
                gender,age,about,state,country} = req.body
        // const errors = validationResult(req);
        console.log(req.body);
    
        // if (!errors.isEmpty()) {
        //         return res.status(400).json({
        //             success: false,
        //             errors: errors.array(),
        //             error : 'Something went wrong!'
        //         });
        // }
        const user = await User.findOne({email})
        if(user) {
            console.log('user exist');
            res.json({error : 'user exists'})
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const newUser = new User({
                name,
                email,
                contact,
                password: hashedPassword,
                username,
                userDetails: {gender,age,about,state,country}
            })
            await newUser.save()
            let token = generateToken(newUser._id)
            
            res.json({
                name: newUser.name,
                email: newUser.email,
                contact: newUser.contact,
                token: token
            })
        }
    } catch (error) {
        next(error)
    }

}

const userLogin = async(req,res,next)=>{

    try {
        console.log('login route');
        const {email,password} = req.body
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                    error : "Something went wrong!"
                });
        }
        const user = await User.findOne({email})
        if(user &&(await bcrypt.compare(password,user.password))){
            console.log('usermatched');
            console.log(user.name, user.email);
            let token = generateToken(user._id)
            console.log(token);
            req.user = user
              
            res.json({
                name:user.name,
                email:user.email,
                token: token
    
            })
        }else{
            if(!user) res.json({error:'Not registered User'})
            console.log('user not matching');
            res.json({error:'invalid email or password'})
        }
    } catch (error) {
        next(error)
    }

}

const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn : '30d'})
} 
module.exports = {userRegister,userLogin}