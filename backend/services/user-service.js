const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

function getAllUsers(){
 return new Promise((resolve, reject) => {
  const query = 'SELECT * FROM user';
  db.query(query, (error, results) => {
    if(error){
      return reject(error);
    }
    resolve(results);
  })
});
}
function register(user){
  return bcrypt.hash(user.password, 8).then((hash)=>{
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO user (user_email, user_password, user_firstName, user_lastName, user_gender, user_birthDate, user_phoneNumber, user_card_id, user_email_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const queryVar = [user.email, hash, user.firstname, user.lastname, user.gender, user.birthdate, user.phonenumber, user.cardId, user.emailConfirmed];
      db.query(query, queryVar, (error, results) => {
        if(error){
          return reject(error);
        }
        resolve(results);
      });
      
    }).then((results)=>{
      db.query("INSERT INTO "+user.userType+" SET ?", {User_id: results.insertId}, (error, results)=>{
        if (error){
          console.log(error);
        }
      });
    });
  });
}
function login(user){
  return new Promise((resolve, reject)=>{
    db.query('SELECT * FROM user WHERE user_email = ?', [user.email], async(error, results) =>{
      console.log(results);
      if(!results || !(await bcrypt.compare(user.password, results[0].user_password))){
        error = new Error("wrong email or password");
        return reject(error);
      }else{
        const id = results[0].user_id;
        //create a token for the user
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });
        console.log("The token is: " + token);
        if(error){
          return reject(error);
        }
        resolve(token);
      }

    });
  });
}
module.exports = {register, getAllUsers, login};