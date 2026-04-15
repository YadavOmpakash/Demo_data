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






// ========================
// GLOBAL VARIABLES
// ========================
let postCounter = 0;

// ========================
// ADD POST (TEXT + IMAGE)
// ========================
function addPost() {
  let text = document.getElementById("postText").value;
  let file = document.getElementById("imageUpload").files[0];

  if (text === "" && !file) return;

  let reader = new FileReader();

  reader.onload = function (e) {
    createPost(text, e.target.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    createPost(text, null);
  }
}

// ========================
// CREATE POST
// ========================
function createPost(text, image) {
  postCounter++;

  let post = document.createElement("div");
  post.className = "post";

  post.innerHTML = `
    <p>${text}</p>
    ${image ? `<img src="${image}" width="100%">` : ""}

    <button onclick="likePost(this)">🤍 Like</button>

    <div>
      <input id="comment-input-${postCounter}" placeholder="Write comment...">
      <button onclick="addComment(${postCounter})">Comment</button>
    </div>

    <div id="comments-${postCounter}"></div>
  `;

  document.getElementById("posts").prepend(post);

  document.getElementById("postText").value = "";
  document.getElementById("imageUpload").value = "";

  showNotification("✅ Post Added!");
  savePosts();
}

// ========================
// LIKE / UNLIKE
// ========================
function likePost(btn) {
  if (btn.classList.contains("liked")) {
    btn.classList.remove("liked");
    btn.innerText = "🤍 Like";
  } else {
    btn.classList.add("liked");
    btn.innerText = "❤️ Liked";
  }
}

// ========================
// ADD COMMENT
// ========================
function addComment(id) {
  let input = document.getElementById("comment-input-" + id);
  let text = input.value;

  if (text === "") return;

  let comment = document.createElement("p");
  comment.innerText = "💬 " + text;

  document.getElementById("comments-" + id).appendChild(comment);
  input.value = "";

  showNotification("💬 Comment Added");
}

// ========================
// DARK MODE
// ========================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ========================
// SEARCH POSTS
// ========================
function searchPosts() {
  let input = document.getElementById("search").value.toLowerCase();
  let posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    let text = post.innerText.toLowerCase();
    post.style.display = text.includes(input) ? "block" : "none";
  });
}

// ========================
// NOTIFICATION SYSTEM
// ========================
function showNotification(msg) {
  let notif = document.createElement("div");
  notif.className = "notification";
  notif.innerText = msg;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000);
}

// ========================
// LOCAL STORAGE SAVE
// ========================
function savePosts() {
  localStorage.setItem("posts", document.getElementById("posts").innerHTML);
}

// ========================
// LOAD POSTS ON START
// ========================
function loadPosts() {
  let data = localStorage.getItem("posts");
  if (data) {
    document.getElementById("posts").innerHTML = data;
  }
}
window.onload = loadPosts;
                                

</script>
