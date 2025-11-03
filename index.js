import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
const year = new Date().getFullYear();
let loginY = "0";
let postsCache = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Load posts.json once at startup
fs.readFile('./posts.json', 'utf8', (err, data) => {
  if (err) return console.error("Failed loading posts.json:", err);
  try {
    postsCache = JSON.parse(data);
  } catch (e) {
    console.error("Invalid JSON in posts.json:", e);
  }
});

app.get("/", (req, res) => {

    const posts = postsCache;
    const data = {
      year: year,
      posts: posts,
      loginStatus: loginY,
    };
    res.render("index.ejs", data);

});

app.get("/login", (req, res) => {

    const data = {
      year: year,
      posts: postsCache,
      loginStatus: loginY,
    }
    res.render("login.ejs", data);

});

app.get("/signup", (req, res) => {

    const data = {
      year: year,
      posts: postsCache,
      loginStatus: loginY,
    }
    res.render("signup.ejs", data);

});


app.post("/User", (req, res) => {
  
  const { userName, passWord } = req.body;

  if (userName !== "Zen" || passWord !== "Zenlogue@123") {
    return res.status(401).send(`
      <script>
        alert("Wrong credentials!");
        window.location.href = "/login";
      </script>
    `);
  }

  loginY = "1"; 
  return res.redirect('/');
});

app.post('/posts/new', (req, res) => {
  const { title, content } = req.body;
    
    let author = "Test User";

    const posts = postsCache;
    posts.push({ title, author, date: new Date().toISOString(), content});

    const data = {
          year: year,
          posts: posts,
          loginStatus: loginY,
        };

        return res.redirect('/');

});

app.get('/logout', (req, res) => {
  loginY = "0"; 
  res.redirect('/');  
});

app.get("/about", (req, res) => {

    const data = {
      year: year,
      loginStatus: loginY,
    };
    res.render("about.ejs", data);

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

