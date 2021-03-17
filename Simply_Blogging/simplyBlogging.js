var entry = new Object();

function addBlog() {
    entry.title = document.getElementById("title").value;
    entry.desc = document.getElementById("desc").value;
    entry.image = document.getElementById("image").value;
    entry.uniqueStringID = entry.title + getRandomInt(100);

    if(entry.title == "" || entry.desc == "" || entry.image == "") {
        alert("Please complete all fields.")
    } else {
        sessionStorage.setItem(entry.uniqueStringID, JSON.stringify(entry));
        insertBlogToView(entry.uniqueStringID);
    }
}

function insertBlogToView(uniqueStringID) {
    var blog = JSON.parse(sessionStorage.getItem(uniqueStringID));
    createBlogElement(blog);
    resetData();
}

function loadBlogs() {
    Object.keys(sessionStorage).forEach(function(key){
        var blog = JSON.parse(sessionStorage.getItem(key));
        createBlogElement(blog);
    });
}

function createBlogElement(blog) {
    const blogPost = document.createElement('div');
    blogPost.className = 'container';
    blogPost.innerHTML = `<div class="row">
                            <div class="container">
                                <p>` + blog.title + `</p>` +
                                    `<img src="" id=blogImg-` + blog.uniqueStringID + ` style="width:100%"/></br></br>
                                <p>` + blog.desc + `</p>
                            </div>
                         </div>`;

    document.getElementById("viewBlog").appendChild(blogPost);
    
    if(blog.dataURL) {
        document.querySelector(`#blogImg-` + blog.uniqueStringID).setAttribute("src", blog.dataURL);
    }
}

function readFile() {
    document.querySelector("#image").addEventListener("change", function() {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if(document.getElementById("image").value != "") {
                entry.dataURL = reader.result;
            }
        }); 
        reader.readAsDataURL(this.files[0]);
    });
}

function resetData() {
    document.getElementById("title").value="";
    document.getElementById("desc").value="";
    document.getElementById("image").value="";
    entry.dataURL = null;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}