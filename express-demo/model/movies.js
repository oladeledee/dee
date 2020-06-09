const express=require('express');
const Joi=require('joi');
const mongoose=require('mongoose');
const {genreSchema}=require('../model/genres')





const moviesSchema=new mongoose.Schema({
    title:{
       type: String,
       required:true,
       minlength:5,
       maxlength:255,
       trim:true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberinstock:{
        type: Number,
        required:true,
        minlength:0,
        maxlength:255,
    },
    dailyRentalRate:{
        type: Number,
        required:true,
        minlength:0,
        maxlength:255,
       
    }})

    function validateMovies(movies) {
        const schema = {
          title: Joi.string().min(5).max(225).required(),
          genreId:Joi.objectId().required(),
          numberinstock:Joi.number().min(0).required(),
          dailyRentalRate:Joi.number().min(0).required()
        };
      
        return Joi.validate(movies, schema);
      }
    
    const Movies=mongoose.model('movies',moviesSchema);

exports.validateMovies=validateMovies;
exports.Movies=Movies;
exports.moviesSchema=moviesSchema;
//listCourse()