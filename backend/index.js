const express = require("express");
const db = require("./config/db");
const authRouter = require('./routes/user-auth-router');
const adminRouter = require('./routes/admin-router')
const profileRouter = require('./routes/user-profile-router')
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './.env'});

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // replace with your frontend URL
  credentials: true // enable the use of cookies
}));
app.use(cookieParser())
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL Connected...")
  }
})

//Define Routes
//app.use('/', require('./routes/pages'));
app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/profile', profileRouter)

app.listen(5000, () => {
  console.log("Server started on Port 5000");
})