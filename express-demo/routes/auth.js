const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcrypt');
const express=require('express');
const _=require('lodash');
const router=express.Router();
const Joi=require('joi');
const {User}=require('../model/user')



  router.post('/',async(req,res)=>{
    const { error } = validateAuth(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(404).send('invalid email or password');

        valid=await bcrypt.compare(req.body.password,user.password);
        if(!valid) return res.status(404).send('invalid email or password');

        const token=user.generateToken();
res.send(token)
  })
  
function validateAuth(req) {
    const schema = {
      password:Joi.string().min(5).max(225).required(),
      email:Joi.string().min(5).max(225).required().email()
    };
  
    return Joi.validate(req,schema);
  }
  module.exports=router;