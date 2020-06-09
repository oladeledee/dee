const Joi=require('joi');
const mongoose=require('mongoose');
const config=require('config');
const jwt =require('jsonwebtoken');



const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255
  },
  password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:1035,
    unique:true
  },
  email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255,
    unique:true
  },
  isAdmin:Boolean

});

userSchema.methods.generateToken=function(){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtprivatekey'))
  return token}
  
const User= mongoose.model('User',userSchema);




function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(225).required(),
      password:Joi.string().min(5).max(225).required(),
      email:Joi.string().min(5).max(225).required().email(),
      isAdmin:Joi.boolean()
    };
  
    return Joi.validate(user,schema);
  }


  exports.User=User;  
  exports.userSchema=userSchema;
  exports.validateUser=validateUser;
