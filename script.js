<script>

// AUTO LOGIN (refresh ke baad bhi login rahe)
window.addEventListener("load", function(){
  if(localStorage.getItem("login") === "true"){
    showMain();
  }
});

// LOGIN FUNCTION
function login(){
  let u = document.getElementById("user").value.trim();
  let p = document.getElementById("pass").value.trim();

  if(u === "" || p === ""){
    document.getElementById("msg").innerHTML = "⚠️ Enter username & password";
    return;
  }

  if(u === "om" && p === "123"){
    localStorage.setItem("login", "true");
    localStorage.setItem("username", u);
    showMain();
  } else {
    document.getElementById("msg").innerHTML = "❌ Wrong Login";
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

// LOGOUT (optional)
function logout(){
  localStorage.clear();
  location.reload();
}

// IMAGE UPLOAD
function loadImage(event){
  let img = document.getElementById("profilePic");
  img.src = URL.createObjectURL(event.target.files[0]);
}

// CAMERA
function startCamera(){
  navigator.mediaDevices.getUserMedia({video:true})
  .then(stream=>{
    document.getElementById("video").srcObject = stream;
  });
}

// COMMENT
function addComment(){
  let text = document.getElementById("comment").value;
  document.getElementById("showComment").innerHTML = text;
}

// IFRAME
function openPage(page){
  document.getElementById("frame").src = page;
}

// FOOTER COLOR
function changeColor(){
  document.body.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
}

</script>
