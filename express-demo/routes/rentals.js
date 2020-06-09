const express =require ('express');
const router=express.Router();
const mongoose=require('mongoose');
const fawn=require('fawn');
const {Customer}=require('../model/customer');
const auth=require('../middleware/auth')
const {Movies}=require('../model/movies');
const {validateRental,Rentals}=require('../model/rentals');

fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals=await Rentals.find();
    res.send(rentals);
  });
  
  router.post('/',auth,async(req, res) => {
    
    const { error } = validateRental(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  const customer= await Customer.findById(req.body.customerId)
  if (!customer) return res.status(400).send('invalid customer ID');

  const movies= await Movies.findById(req.body.moviesId)
  if (!movies) return res.status(400).send('invalid movie ID');

  if(movies.numberinstock==0) return res.status(400).send('movie not in stock');


    let rentals = new Rentals({
       customer:{
           _id:customer._id,
           name:customer.name,
           phone:customer.phone
       },
       movies:{
           _id:movies._id,
           title:movies.title,
           dailyRentalRate:movies.dailyRentalRate


       },
    });
try{
  new fawn.Task()
  .save('rentals',rentals)
  .update('movies',{_id:movies._id},{
    $inc:{numberinstock:-1}
  })
  .run();
   
    res.send(rentals);}

    catch(ex){
      res.status(500).send('Transaction error');
    }
  });

  router.get(':/Id', async (req,res)=>{
    const rentals= await Rentals.findById(req.params.Id);
    if(!rentals)return res.status(400).send('invalid ID');

    res.send(rentals);

  })

  
 

  module.exports=router;
  
