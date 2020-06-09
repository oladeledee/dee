const express =require ('express');
const router=express.Router();
 const auth=require('../middleware/auth');

const {validateMovies,Movies}=require('../model/movies');



router.get('/', async (req, res) => {
    const movies=await Movies.find();
    res.send(movies);
  });
  
  router.post('/',auth ,async(req, res) => {
    
    const { error } = validateMovies(Movies); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre=await genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('invalid genre')
    let movies = new Movies(
        {title:req.body.title,
        genre:{
            _id:genre._Id,
            name:genre.name
        },
        numberinstock:req.body.numberinstock,
        dailyRentalRate:req.body.dailyRentalRate}
                            );
      movies=await movies.save();
    res.send(movies);
  });

  router.delete('/:id',auth,async (req, res) => {
    const movies=await Movies.findByIdAndRemove(req.params.id)
    
    if (!movies) return res.status(404).send('The customer with the given ID was not found.');
  
  
  
    res.send(movies);
  });

  
  router.put('/:id',async (req, res) => {
    const { error } = validateMovies(Movies); 
    if (error) return res.status(400).send(error.details[0].message);

    const movies=await Movies.findByIdAndUpdate(req.params.id,{title:req.body.title},
      {new:true})

    
    if (!movies) return res.status(404).send('The genre with the given ID was not found.');
  
   
    res.send(movies);
  });
  
  router.get('/:id', async(req, res) => {
    const movies=await Movies.findById(req.params.id)
    if (!movies) return res.status(404).send('The genre with the given ID was not found.');
    res.send(movies);
  });
  
  

  module.exports=router;
  
