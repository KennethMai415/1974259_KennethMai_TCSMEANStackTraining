let fs = require("fs");
let http = require("http");
let url = require("url");
let port = 9999;
let tasks = [];

let htmlContent = `
    <form action="/addTask" method="get">
        <h2>Add Task</h2>

        <label>Employee ID: </label>
        <input type="text" name="empID"/><br/>

        <label>Task ID: </label>
        <input type="text" name="taskID"/><br/>

        <label>Task: </label>
        <input type="text" name="task"/><br/>

        <label>Deadline: </label>
        <input type="text" name="deadline"/><br/>

        <input type="submit" value="Add Task"/>
        <input type="reset" value="reset"/><br/><hr/>
    </form>

    <form action="/deleteTask">
        <h2>Delete Task</h2>
        <Label>Task ID: </Label>
        <input type="text" name="deleteTask"/><br/>
        <input type="submit" value="Delete Task"/><br/><hr/>
    </form>

    <form action="/showTasks">
        <h2>Show Current Tasks</h2>
        <input type="submit" value="Show Current Tasks"/><br/><hr/>
    </form>
`;

let server = http.createServer((req, res) => {
    let pathInfo = url.parse(req.url,true).pathname;
    let data = url.parse(req.url, true).query;
    let isDupeTask = false;

    res.setHeader("content-type","text/html");
    if(req.url != "/favicon.ico") {
        if (pathInfo == "/addTask") {
            tasks = [];
            try {
                let tasksEntries = fs.readFileSync("tasks.json").toString();
                if(tasksEntries != "") {
                    let tasksParsed = JSON.parse(tasksEntries);
                    for(let task of tasksParsed) {
                        if(task.TaskID == data.taskID){
                            isDupeTask = true;
                        }
                        tasks.push(task);
                    }
                }
            } catch {}

            if(!isDupeTask) {
                tasks.push({
                    "EmployeeID": data.empID,
                    "TaskID": data.taskID,
                    "Task": data.task,
                    "Deadline": data.deadline
                });
            }

            let tasksString = JSON.stringify(tasks);
            fs.writeFileSync("tasks.json", tasksString);
            res.end(htmlContent); 

        } else if (pathInfo == "/deleteTask") {  
            try {
                let tasksEntries = fs.readFileSync("tasks.json").toString();
                if(tasksEntries != "") {
                    let tasksParsed = JSON.parse(tasksEntries);
                    for(let i in tasksParsed) {
                        if(tasksParsed[i].TaskID == data.deleteTask) {
                            tasks.splice(i, 1);
                        }
                    }
                    let tasksString = JSON.stringify(tasks);
                    fs.writeFileSync("tasks.json", tasksString);
                }
            } catch {}
            res.end(htmlContent); 

        } else if (pathInfo == "/showTasks") {
            let cellStyle = `style="border: 1px black solid"`;
            let row = "";
            
            try {
                let tasksEntries = fs.readFileSync("tasks.json").toString();
                if(tasksEntries != "") {
                    let tasksParsed = JSON.parse(tasksEntries);
                    for(let task of tasksParsed) {
                        row += `
                            <tr>
                                <td ${cellStyle}>${task.EmployeeID}</td>
                                <td ${cellStyle}>${task.TaskID}</td>
                                <td ${cellStyle}>${task.Task}</td>
                                <td ${cellStyle}>${task.Deadline}</td>
                            </tr>
                        `;
                    }
                }
            } catch {}

            let tasksContent = `
                <h2>Tasks</h2>
                <table style="border: 1px black solid;" id="taskTable">
                    <thead>
                        <tr>
                            <th ${cellStyle}>Employee ID</th>
                            <th ${cellStyle}>Task ID</th>
                            <th ${cellStyle}>Task</th>
                            <th ${cellStyle}>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${row}
                    </tbody>
                </table>
            `;
            res.end(tasksContent); 
        } else {
            res.end(htmlContent);
        }
    }
}).listen(port, ()=>console.log(`Listening on port ${port}`));
