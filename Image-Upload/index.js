const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploads = multer({ storage });




app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("home");
});
app.use(express.urlencoded({ extended: false }));

app.post("/upload", uploads.single("file"), (req, res) => {
  // Handle file upload
  console.log(req.body);
  console.log(req.file);
//   res.send("File uploaded successfully");
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
