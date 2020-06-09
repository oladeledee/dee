const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('connecting to playground'))
.catch(err =>console.error('could not connect to database ',err));


const authorschema=new mongoose.Schema({
    name:String,
    bio:String,
    website:String
})
const Author=mongoose.model('author',authorschema);

const courseSchema=new mongoose.Schema({
    name:String,
    author:[authorschema]
       
    })
    
    const Course=mongoose.model('course',courseSchema);
    
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

/*createCourse("Node course",[
new Author({name:'duke'}),
new Author({name:'dola'})

])*/


async function updateCourse(courseId){
    const course= await Course.findById(courseId);
    course.author.name='Nonso Amandi'
    course.save();
}


//updateCourse('5ed00d0ee309e92ae887e3ca');

async function addCourse(courseId,author){
    const course=await Course.findById(courseId);
    course.author.push(author);
    course.save();
}
//addCourse('5ed017892df12e1a6086b12e',new Author({name:'badebo'}));

async function removeAuthor(courseId,authorId){
    const course =await Course.findById(courseId);
    const authors= course.author.id(authorId);
    authors.remove()
    course.save();
}
removeAuthor('5ed017892df12e1a6086b12e','5ed017e02b2a1207c08ef090');

async function listCourse(){
    const courses= await Course
    .find()
    .populate('author')
    .select('name author');
    console.log(courses)
};
 
//listCourse()