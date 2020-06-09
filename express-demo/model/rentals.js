const Joi=require('joi');
const mongoose=require('mongoose');



const rentalSchema=new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
        name:{
       type: String,
       required:true,
       minlength:5,
       maxlength:50,
    },
    isGold:{
        type:Boolean,
        Default:false
    },
    phone:{
        type: Number,
        required:true,
        minlength:5,
        maxlength:50,
    }
  }),
  required:true
},
   movies:{
       type:new mongoose.Schema({
        title:{
            type: String,
            required:true,
            minlength:5,
            maxlength:50,
            trim:true
         },
         dailyRentalRate:{
             type:Number,
             required:true,
             minlength:0,
             maxlength:255
         }
    
       }),
       required:true,

   },
   dateOut:{
       type:Date,
       Default:Date.now,
       required:true
   },
   dateReturned:{
       type:Date,
                },

     rentalFee:{
         type:Number,
         min:0
     }           
     } );

    function validateRental(rentals) {
        const schema = {
            customerId:Joi.objectId().required(),
            movieId:Joi.objectId().required(),
        };
      
        return Joi.validate(rentals, schema);
      }
    
      const Rentals=mongoose.model('rentals',rentalSchema);

exports.validateRental=validateRental;
exports.Rentals=Rentals;
exports.rentalSchema=rentalSchema;
//listCourse()