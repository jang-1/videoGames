const express = require('express');
const path = require('path');
var cors = require('cors')
var multer = require('multer')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth")
const postsRoutes = require("./routes/posts")
const reviewsRoutes = require("./routes/reviews")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true); 
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(cookieParser())
app.use("/api/images", express.static(path.join(__dirname, 'images')))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false)
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  return res.status(200).json({ filename: file.filename });
});

// Ustawienie parsera do przetwarzania danych JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/reviews", reviewsRoutes)

// Nasłuchiwanie na określonym porcie
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});