const express = require('express');
var cors = require('cors')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth")
const postsRoutes = require("./routes/posts")

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser())


// Ustawienie parsera do przetwarzania danych JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)



// Nasłuchiwanie na określonym porcie
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});