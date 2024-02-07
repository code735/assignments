const mongoose = require('mongoose');
const express  = require('express');

const app = express();
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb+srv://prathmeshjkumbhar:n2wXu65yiJhhQH89@evalcluster.sy6gr0o.mongodb.net/03_mongo_assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

app.get('/courses',async(req,res)=>{
    try{
        const courses = await Course.find();
        res.json(courses);
    }
    catch(error) {
        res.status(500).json({error: 'Failed to find courses'});
    }
})

app.post('/courses',async(req,res)=>{
    try{
        const newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageLink: req.body.imageLink
        })

        await newCourse.save()
        res.status(200).json(newCourse)
    }
    catch(error) {
        console.log('error',error)
        res.status(500).json({error: 'Failed to create courses'});
    }
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

app.listen(3000)

module.exports = {
    Admin,
    User,
    Course
}
