const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userDetails: {
      gender: {
        type: String,
        // required: true, 
        enum: ['male', 'female','other'],
      },
      birthDate: {
        type: Date,
        required: true
      },
      about: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      }
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followings: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  saved: [{
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  }],
  activeStatus: {
    type: Boolean,
    default: true
  },
  verified :{
    type: Object,
    default:{mobile : false, email : false} 
  },
  accountCreatedAt: {
    type: Date,
    default : new Date()
  }
});





const User = mongoose.model('User', UserSchema)
module.exports = User; 