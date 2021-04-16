let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let Message = require("./message.model.js");

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Messages", {useNewUrlParser:true, useUnifiedTopology: true}); 

let db = mongoose.connection;
db.on("Error", (err)=>console.log(err)); 

app.get("/", (req,res)=> {
    res.sendFile(__dirname+"/index.html");
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        let chatMsg = Message({
            userName: msg.name,
            message: msg.message
        });
        chatMsg.save((err, result)=>{
            if(!err) {
                console.log("Chat message added successfully");
            } else {
                console.log("Add Error: " + err);
            }
        });
    });
});

http.listen(9090, ()=>console.log("Listening on port 9090..."));
