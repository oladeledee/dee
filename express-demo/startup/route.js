const express=require('express');
const error=require('../middleware/error');
const genre=require('../routes/genres');
const customer=require('../routes/customer');
const movies=require('../routes/movies');
const rentals=require('../routes/rentals');
const auth=require('../routes/auth');
const user=require('../routes/user');


module.exports=function(app){
app.use(express.json());
app.use('/api/genres',genre);
app.use('api/rentals',rentals);
app.use('/api/customers',customer);
app.use('/api/users',user); 
app.use('/api/auths',auth);
app.use('/api/movies',movies);

app.use(error);}