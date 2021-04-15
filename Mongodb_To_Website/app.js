let app = require("express")();
let url = "mongodb://localhost:27017/Courses"
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Use to get rid of compile warnings
const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology: true
};

// Ready to connect (set connect options)
mongoose.connect(url, mongooseDbOption); 

// Connect to mongodb database
let db = mongoose.connection;
db.on("Error", (err)=>console.log(err)); 

let CourseSchema = mongoose.Schema({
    _id: String, 
    courseName: String,
    description: String,
    amount: String
});

// Create model using schema
let course = mongoose.model("", CourseSchema, "Course_Records");

db.once(("open"), ()=>{
    app.get("/", (req, res)=>{
        res.sendFile(__dirname+"/index.html");
    });
    
    app.post("/addCourse", (req, res)=>{
        let c = course({
            _id: req.body.courseId,
            courseName: req.body.courseName,
            description: req.body.description,
            amount: req.body.amount,
        });

        c.save((err, result)=>{
            if(!err) {
                console.log("Added course successfully");
            } else {
                console.log("Add Error: " + err);
            }
        });
        res.sendFile(__dirname+"/index.html");
    });
    
    app.post("/updateCourse", (req, res)=>{
        course.updateOne({_id:req.body.courseId}, {$set:{amount:req.body.amount}}, (err, result)=>{
            if(err) {
                console.log("Update Error: " + err);
            } 
            res.sendFile(__dirname+"/index.html");
        });
    });
    
    app.post("/deleteCourse", (req, res)=>{
        course.deleteOne({_id:req.body.courseId}, (err, result)=>{
            if(err) {
                console.log("Delete Error: " + err);
            } 
            res.sendFile(__dirname+"/index.html");
        });
    });
    
    app.get("/fetchCourses", (req, res)=>{
        course.find({}, (err, result)=>{
            if(!err) {
                res.json(result);
            } else {
                console.log("Fetch Error: " + err);
                res.sendFile(__dirname+"/index.html");
            }
        });
    });
});

app.listen(9090, ()=>console.log("Listening on port 9090..."));