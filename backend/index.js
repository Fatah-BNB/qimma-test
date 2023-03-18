const express = require("express");
const db = require("./db");
const authRouter = require('./routes/user-router.js');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

const app = express();

app.use(cors());
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

app.listen(5000, () => {
  console.log("Server started on Port 5000");
})