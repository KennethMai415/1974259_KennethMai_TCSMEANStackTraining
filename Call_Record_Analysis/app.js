let mongoose = require("mongoose");
let fs = require("fs");

mongoose.Promise = global.Promise;

let url = "mongodb://localhost:27017/CallRecords";

const mongooseDbOption = {     
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, mongooseDbOption);

let db = mongoose.connection;
db.on("error",(err)=>console.log(err));

db.once("open",()=>{
    //Defining the Schema 
    let callRecordSchema = mongoose.Schema({
        _id:Number,
        source:String,
        destination:String,
        sourceLocation:String,
        destinationLocation:String,
        callDuration:String,
        roaming:String,
        callCharge:String
    });

    // Creating model using schema 
    let callRecord = mongoose.model("",callRecordSchema,"CallRecord");

    // Retrieving call records from external json file
    let data = fs.readFileSync("call_data.json");
    let callRecordsJSON = JSON.parse(data.toString());

    for(let record of callRecordsJSON) {
        // Creating reference using model 
        let cr = new callRecord({
            "_id": record._id, 
            "source": record.source, 
            "destination": record.destination, 
            "sourceLocation": record.sourceLocation, 
            "destinationLocation": record.destinationLocation,  
            "callDuration": record.callDuration,  
            "roaming": record.roaming, 
            "callCharge": record.callCharge
        });

        cr.save((err,result)=>{
            if(!err){
                console.log("Call record inserted successfully.");
            }else {
                console.log(err);
            }
            mongoose.disconnect(); 
        });
    }
})