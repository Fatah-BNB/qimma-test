const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

//Login section
function login(admin) {
  //retrieve user form db
  return  new Promise((resolve, reject) => {
    db.query('SELECT * FROM admin WHERE admin_email = ?', [admin.email], async (error, results) => {
      if (!results[0] || admin.password !== results[0].admin_password) {
        error = new Error("wrong email or password");
        reject(error);
      } else if(error){
        reject(error)
      }else{
        resolve(results);
      }
    }); 
  })
}

function createToken(adminId){
  const token = jwt.sign({ adminId: adminId, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token
}

function checkToken(token){
  console.log("--- Token into ID")
  return "adminId"
}
function adminRole(id){
  console.log("--- Admin role is HR")
  return "HR"
}

//Admin features
function countUsers(token){
  console.log("--- Start counting fun")
  return new Promise ((resolve,reject) => {
    if (adminRole(checkToken(token)) === "HR"){
      db.query("SELECT COUNT(*) FROM user;",(error,result)=>{
        if (error){
          console.log("---- Counting error")
          reject(error)
        }else{
          console.log("---- Results retrieved")
          resolve(result[0]["COUNT(*)"])
        }
      })
  }else{
    console.log("---- Permission not aquired")
    reject("You don't have permission to do this feature")}
  })
}
module.exports = {login, createToken,countUsers };