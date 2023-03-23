const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

function getAllUsers() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user';
    db.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    })
  });
}

function login(admin) {
  //retrieve user form db
  return  new Promise((resolve, reject) => {
    db.query('SELECT * FROM admin WHERE admin_email = ?', [admin.email], async (error, results) => {
      console.log(results[0]);
      if (!results || !(await bcrypt.compare(admin.password, results[0].admin_password))) {
        error = new Error("wrong email or password");
        return reject(error);
      } else {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    }); 
  })
}

function createToken(userId){
  const token = jwt.sign({ adminId: userId, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token
}
module.exports = {getAllUsers, login, createToken };