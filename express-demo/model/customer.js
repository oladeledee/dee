const express =require ('express');
const Joi= require('joi');
const router=express.Router();
const mongoose=require('mongoose');


const customerschema= new mongoose.Schema({
name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
},
phone:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
},
isGold:{
    type:Boolean,
    default:false
}


});

const Customer=mongoose.model('customer',customerschema);


  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone:Joi.string().min(5).max(50).required(),
      isGold:Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.validateCustomer=validateCustomer;
  exports.Customer=Customer;