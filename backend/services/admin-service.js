const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

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
module.exports = {login, createToken };