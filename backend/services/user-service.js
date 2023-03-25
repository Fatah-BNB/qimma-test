const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

function register(user) {
  console.log("register called")
  return bcrypt.hash(user.password, 8).then((hash) => {
    console.log("password crypted")
    return new Promise((resolve, reject) => {//insert new user to user table
      const query = "INSERT INTO user (user_email, user_password, user_firstName, user_lastName, user_gender, user_birthDate, user_phoneNumber, user_card_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const queryVar = [user.email, hash, user.firstname, user.lastname, user.gender, user.birthdate, user.phonenumber, user.cardId];
      db.query(query, queryVar, (error, results) => {
        if (error) {
          console.log("not working : ", error)
          return reject(error);
        }
        resolve(results);
      });
    }).then((results) => {
      return new Promise((resolve, reject) =>{// get all users 
        db.query('SELECT * FROM user WHERE user_id = ?', [results.insertId], (error, results) =>{
          if(error){
            console.log(error)
            return reject(error)
          }
          resolve(results)
        })
      })
    }).then((OldResults) => {
      return new Promise((resolve, reject) =>{//set userType 
        db.query("INSERT INTO " + user.userType + " SET ?", { User_id: OldResults[0].user_id }, (error, results) => {
          if (error) {
            console.log(error);
            return reject(error)
          }
          resolve(OldResults)
        });
      })
    });
  });
}
function login(user) {
  //retrieve user form db
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE user_email = ?', [user.email], async (error, results) => {
      console.log(results[0]);
      if (!results || !(await bcrypt.compare(user.password, results[0].user_password))) {
        error = new Error("wrong email or password");
        return reject(error);
      } else {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    });

  }).then((oldResults) => {
    //retrieve user type
    return new Promise((resolve, reject) => {
      let userType = [];
      db.query('SELECT * FROM student WHERE User_id = ?', [oldResults[0].user_id], (fields, results) => {
        if (JSON.stringify(results).length > 2) {
          userType.push("student");
        };
      });
      db.query('SELECT * FROM instructor WHERE User_id = ?', [oldResults[0].user_id], (fields, results) => {
        if (JSON.stringify(results).length > 2) {
          userType.push("instructor");
        };
      });
      db.query('SELECT * FROM parent WHERE User_id = ?', [oldResults[0].user_id], (fields, results) => {
        if (JSON.stringify(results).length > 2) {
          userType.push("parent");
        };
        oldResults[0].userType = userType.toString();
        resolve(oldResults);
      });
    });
  });
}

function createToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token
}
function createEmailToken(username, userId){
  const token = jwt.sign({ username, userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
  console.log('email token created ', token)
  return token
}

async function sendEmail(username, userEmail, token){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // replace with your Gmail email address
      pass: process.env.GMAIL_PASSWORD // replace with your Gmail password or app-specific password
    }
  });
  // setup email data with unicode symbols
  const mailOptions = {
    from: process.env.GMAIL_USER, // replace with the email address of the sender
    to: userEmail, // replace with the email address of the recipient
    subject: 'Email confirmation', // replace with the subject of the email
    html: 'http://localhost/verifyUserEmail/'+username+'/'+token // replace with the HTML content of the email
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
/*function updateEmailStatus(){
  const query = `UPDATE user SET user_email_confirmed = true WHERE user_id = ${userId}`;
  // execute the query
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} row(s) updated`);
  });
}*/
module.exports = { register, login, createToken, createEmailToken, sendEmail};