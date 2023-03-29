const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

function register(user) {
  return bcrypt.hash(user.password, 8).then((hash) => {
    return new Promise((resolve, reject) => {
      console.log(user)
      const query = "INSERT INTO user (user_email, user_password, user_firstName, user_lastName, user_gender, user_birthDate, user_phoneNumber, user_card_id, wilaya_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const queryVar = [user.email, hash, user.firstname, user.lastname, user.gender, user.birthdate, user.phonenumber, user.cardId, user.wilaya_code];
      db.query(query, queryVar, (error, results) => {
        if (error) {
          dupEmailErr = new Error("Failed to create account\n(possible reason: this email address is already in use)")
          reject(dupEmailErr);
        }
        resolve(results);
      });
    }).then((results) => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE user_id = ?', [results.insertId], (error, results) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        })
      })
    }).then((OldResults) => {
      return new Promise((resolve, reject) => {//set userType
        let queryVar
        switch(user.userType){
          case "student":
            queryVar = { user_id: OldResults[0].user_id, tier: user.tier};
            break;
          case "instructor":
            queryVar = { user_id: OldResults[0].user_id};
            break;
          default:
            queryVar = { user_id: OldResults[0].user_id};
        }
        db.query("INSERT INTO " + user.userType + " SET ?", queryVar, (error, results) => {
          if (error) {
            reject(error)
          }else if(user.field){//save the instructor id in OldResults
            OldResults[0].instructorId = results.insertId;
            resolve(OldResults)
          }else{
            resolve(OldResults)
          }
          
        });
      })
    }).then((OldResults) =>{
      return new Promise((resolve, reject)=>{
        if(user.field){
          db.query('SELECT * FROM field WHERE field_name = ?', [user.field], (error, results)=>{
            if(error){
              reject(error)
            }else{// save field code in oldResults
              OldResults[0].fieldId = results[0].field_code;
              resolve(OldResults);
            }
          })
        }else{
          resolve(OldResults)
        }
      })
    }).then((OldResults)=>{
      return new Promise((resolve, reject)=>{
        if(OldResults[0].hasOwnProperty('fieldId')){
          const queryVar = {instructor_id: OldResults[0].instructorId, field_code: OldResults[0].fieldId}
          db.query("INSERT INTO instructor_has_field SET ?", queryVar, (error, results) => {
            if (error) {
              reject(error)
            }else{
              resolve(OldResults)
            }
            
          });
        }else{
          resolve(OldResults)
        }
      })
    });
  });
}

function login(user) {
  //retrieve user form db
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE user_email = ?', [user.email], async (error, results) => {
      console.log(results[0]);
      if (!results[0]  || !(await bcrypt.compare(user.password, results[0].user_password))) {
        const AccountError = new Error("email or password incorrect");
        reject(AccountError);
      } else if (results[0].user_email_confirmed == 'false') {
        const EmailConfirmationError = new Error("confirm you email to log in");
        reject(EmailConfirmationError);
      } else if (error) {
        reject(error)
      } else {
        resolve(results);
      }
    });

  }).then((oldResults) => {
    //retrieve user type
    return new Promise((resolve, reject) => {
      let userType = [];
      let userTypeIds = [];
      db.query('SELECT * FROM student WHERE user_id = ?', [oldResults[0].user_id], (fields, results) => {
        if (JSON.stringify(results).length > 2) {
          userType.push("student");
          userTypeIds.push(results[0].student_id);
        };
      });
      db.query('SELECT * FROM instructor WHERE user_id = ?', [oldResults[0].user_id], (fields, results) => {
        if (JSON.stringify(results).length > 2) {
          console.log(">>>>> ", results)
          userType.push("instructor");
          userTypeIds.push(results[0].instructor_id);
        };
      });
      db.query('SELECT * FROM parent WHERE user_id = ?', [oldResults[0].user_id], (fields, results) => {
        if (JSON.stringify(results).length > 2) {
          userType.push("parent");
          userTypeIds.push(results[0].parent_id);
        };
        oldResults[0].userType = userType.toString();
        oldResults[0].userTypeIds = userTypeIds.toString();
        resolve(oldResults);
      });
    });
  });
}

function createToken(userId, userTypeIds, userType) {
  const token = jwt.sign({ userId, userTypeIds, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token
}
function createEmailToken(username, userId) {
  const token = jwt.sign({ username, userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
  console.log('email token created ', token)
  return token
}

function sendEmail(userEmail, url, subject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASSWORD 
    }
  });
  const mailOptions = {
    from: process.env.GMAIL_USER, 
    to: userEmail, 
    subject: subject, 
    html: url
  };

  // send mail with defined transport object
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });

}
function updateEmailStatus(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  }).then((decoded) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE user SET user_email_confirmed = ? WHERE user_id = ?";
      const queryVar = ["true", decoded.userId ]
      db.query(sql, queryVar, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  })
}
function updatePassword(token, password) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  }).then((decoded) => {
    return new Promise(async (resolve, reject) => {
      const hash = await bcrypt.hash(password, 8)
      const sql = "UPDATE user SET user_password = ? WHERE user_id = ?";
      const queryVar = [hash, decoded.userId ]
      db.query(sql,  queryVar, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  })
}
function retrieveUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE user_email = ?', [email], (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

function getFromTable(tableName){
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM ' +tableName, (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
module.exports = {
  register, login, createToken, createEmailToken, sendEmail, updateEmailStatus,
  updatePassword, retrieveUserByEmail, getFromTable
};