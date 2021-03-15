function returnHome() {
    location.href = "index.html";
}

function addBudgetEntry() {
    var entry = new Object();
    var validEntry = true;

    entry.clientName = document.getElementById("clientName").value;
    entry.projectName = document.getElementById("projectName").value;
    entry.budget = document.getElementById("budget").value;

    Object.keys(sessionStorage).forEach(function(key){
        console.log(sessionStorage.getItem(key));

        var existingTableEntry = JSON.parse(sessionStorage.getItem(key));
        if((entry.clientName == existingTableEntry.clientName) && 
          (entry.projectName == existingTableEntry.projectName)) {
              alert("Exists within table already.")
              validEntry = false;
          }
    });
    if(validEntry) {
        sessionStorage.setItem(entry.clientName, JSON.stringify(entry));
    }
    resetData();
}

function resetData() {
    document.getElementById("clientName").value="";
    document.getElementById("projectName").value="";
    document.getElementById("budget").value="";
}

function buildClientBudgetTable() {

    var totalBudget = 0;
    var table = document.getElementById("budgetList");
    var body = table.getElementsByTagName("tbody")[0];

    Object.keys(sessionStorage).forEach(function(key){
        var entry = JSON.parse(sessionStorage.getItem(key));
        var newRow = body.insertRow(body.length);   
             
        newRow.insertCell(0).innerHTML= entry.clientName;                      
        newRow.insertCell(1).innerHTML= entry.projectName;   
        newRow.insertCell(2).innerHTML= entry.budget; 

        totalBudget += parseInt(entry.budget);
    });

    var newRow = body.insertRow(body.length);
    newRow.insertCell(0).innerHTML= "";                      
    newRow.insertCell(1).innerHTML= "Total";   
    newRow.insertCell(2).innerHTML= totalBudget;  
}