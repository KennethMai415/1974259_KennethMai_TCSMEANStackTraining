let rl = require("readline-sync");
let fs = require("fs");

class log {
    logUserInput() {
        let numEntries = rl.question("How many entries would you like to log? ");
        for(let i = 0; i < parseInt(numEntries); i++) {
            let firstName = rl.question("Enter your first name: ");
            let lastName = rl.question("Enter your last name: ");
            let gender = rl.question("Enter your gender: ");
            let email = rl.question("Enter your email: ");

            let date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            let logTimeCreated = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " " + time;

            let logs = [];
            let logEntry = {"Created":logTimeCreated, "firstName":firstName, "lastName":lastName, "gender":gender, "email":email};
            let logsString = fs.readFileSync("logs.json").toString();
            debugger;

            if(logsString != "") {
                let logsParsed = JSON.parse(logsString);
                debugger;
                for(let log of logsParsed) {
                    logs.push(log);
                }
            }
            logs.push(logEntry)
            let logString = JSON.stringify(logs);
            debugger;
            fs.writeFileSync("logs.json", logString);
            console.log("----------------------");
        }
    }
}

module.exports = {log};