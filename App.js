const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const routes = require('./routers')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require("express-session");
dotenv.config();


const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ✅ Cấu hình CORS đúng cách
app.use(cors({
  origin: 'http://localhost:3000',  // Gốc của frontend React
  credentials: true                 // Cho phép gửi cookie, Authorization token
}));

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: false,      // ✅ false nếu chạy local HTTP, true nếu HTTPS
    httpOnly: true,     // ✅ bảo mật
    maxAge: 1000 * 60 * 60 * 24, // 1 ngày
  }
}));


app.use(cookieParser());
routes(app)
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Connect Db success');
  })
  .catch(error => {
    console.log('MongoDB connection error: ', error);
  })

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

})
