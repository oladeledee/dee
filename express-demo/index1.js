const express=require('express');

const mongoose=require('mongoose');
mongoose.connect('mongodb:\\localhost\vidly')
.then(()=>console.log('connecting to data base'))
.catch(err=>console.error('could not load data base'));





const app=express();
const courses=[
    {       id:1,name:'course1' },
    {       id:1,name:'course2' },
    {       id:1,name:'course3' },
];
app.get('/',(req,res)=>{
res.send('hello world');
});
 
app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]); 
}  );
app.get('/api/courses/:id',(req,res)=>{
res.send(req.param.id);});




app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]); 
}  );
app.get('/api/courses/:id',(req,res)=>{
res.send(req.param.id);
});
//to query http
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.query.id);
});
const port=process.env.PORT||3000;

app.listen(port,()=>console.log(`listening on port ${port}`));
