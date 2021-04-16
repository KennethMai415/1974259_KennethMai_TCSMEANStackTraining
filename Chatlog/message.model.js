let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let messageSchema = mongoose.Schema({
    userName: String,
    message: String
});

// Create model using schema
let Message = mongoose.model("", messageSchema, "Message_Logs");

module.exports = Message;