let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req,res)=> {
    res.sendFile(__dirname+"/index.html");
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log(`Hello ${msg.name}, ${msg.message}`);
    });
});

http.listen(9090, ()=>console.log("Listening on port 9999..."));