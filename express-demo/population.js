const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('connecting to playground'))
.catch(err =>console.error('could not connect to database ',err));

const courseSchema=new mongoose.Schema({
name:String,
author:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Author'
       }
})

const Course=mongoose.model('course',courseSchema);

const authorschema=new mongoose.Schema({
    name:String,
    bio:String,
    website:String
})
const Author=mongoose.model('author',authorschema);

async function createAuthor(name,bio,website){
   const author=new Author({
    name,
    bio,
    website
    });
    const result=await author.save();
    console.log(result);
}

//createAuthor("mosh","engineer","www.enigine room.com")

async function createCourse(name,author){
    const course=new Course({
     name,
     author
     
     });
     const result=await course.save();
     console.log(result);
 }

//createCourse("mosh","5ed004c9ca144c23d83831a2,")

async function listCourse(){
    const courses= await Course
    .find()
    .populate('author')
    .select('name author');
    console.log(courses)
};

listCourse()