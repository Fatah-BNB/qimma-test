const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

function getUserInfo(userId){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM user WHERE user_id = ?', [userId], (error, results)=>{
            if(error){
                console.log("cannot get user info", error)
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = {getUserInfo}