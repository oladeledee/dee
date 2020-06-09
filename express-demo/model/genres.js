const express=require('express');
const Joi=require('joi');
const mongoose=require('mongoose');




const genreSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255
  }
});

const Genre= mongoose.model('Genre',genreSchema);

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(5).max(225).required()
    };
  
    return Joi.validate(genre,schema);
  }


  exports.Genre=Genre ;
  exports.genreSchema=genreSchema;
  exports.validateGenre=validateGenre;
