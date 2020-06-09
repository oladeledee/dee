const config=require('config');
const jwt=require('jsonwebtoken');
const express=require('express');


module.exports=function (req,res,next){
    token=req.header('x-auth-token');
    if(!token) return res.status(401).send("Acces denied...no token provided")

    try{
           const decoded=jwt.verify(token,config.get('jwtprivatekey'));
           req.user=decoded;

           next();
    }
    catch(error){
        res.status(400).send("invalid token123")

    }
    
}

