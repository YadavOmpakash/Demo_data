let users = JSON.parse(localStorage.getItem("users")) || [];

function save() {
  localStorage.setItem("users", JSON.stringify(users));
}

function render() {
  let html = "";
  users.forEach((u, i) => {
    html += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><button onclick="del(${i})">❌</button></td>
      </tr>
    `;
  });
  document.getElementById("data").innerHTML = html;
}

document.getElementById("formData").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  users.push({name, email});
  save();
  render();
  this.reset();
});

function del(i) {
  users.splice(i,1);
  save();
  render();
}

// FILE NAME SHOW
document.getElementById("fileInput").addEventListener("change", function(){
  let file = this.files[0];
  if(file) {
    document.getElementById("fileName").innerText = file.name;
  }
});

// DOWNLOAD
function downloadFile() {
  let blob = new Blob(["Hello Om 🚀"], {type:"text/plain"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "file.txt";
  a.click();
}

// CAMERA
function startCamera() {
  navigator.mediaDevices.getUserMedia({video:true})
    .then(stream => {
      document.getElementById("camera").srcObject = stream;
    });
}

// IMAGE PREVIEW
document.getElementById("imgInput").addEventListener("change", function(){
  let file = this.files[0];
  if(file) {
    document.getElementById("preview").src = URL.createObjectURL(file);
  }
});

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}


<script>

// AUTO LOGIN CHECK (page reload pe bhi login rahe)
window.onload = function() {
  if(localStorage.getItem("login") === "true"){
    showMain();
  }
}

// LOGIN FUNCTION
function login(){
  let u = document.getElementById("user").value.trim();
  let p = document.getElementById("pass").value.trim();

  // validation
  if(u === "" || p === ""){
    document.getElementById("msg").innerHTML = "⚠️ Enter username & password";
    return;
  }

  // demo credentials
  if(u === "om" && p === "123"){
    localStorage.setItem("login", "true");
    localStorage.setItem("username", u);
    showMain();
  } else {
    document.getElementById("msg").innerHTML = "❌ Invalid Login";
  }
}

// SHOW MAIN CONTENT
function showMain(){
  document.getElementById("main").style.display = "block";
  document.getElementById("loginBox").style.display = "none";

  let name = localStorage.getItem("username");
  if(name){
    document.querySelector(".profile h2").innerHTML = "Welcome " + name;
  }
}

// LOGOUT FUNCTION
function logout(){
  localStorage.clear();
  location.reload();
}

</script>
    

render();
