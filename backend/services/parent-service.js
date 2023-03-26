const bcrypt = require('bcrypt');
const db = require('../db');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

function registerChild(user, parentId) {
    console.log("register called")
    return bcrypt.hash(user.password, 8).then((hash) => {
        console.log("password crypted")
        return new Promise((resolve, reject) => {//insert new user to user table
            const query = "INSERT INTO user (user_email, user_password, user_firstName, user_lastName, user_gender, user_birthDate, user_phoneNumber, user_card_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const queryVar = [user.email, hash, user.firstname, user.lastname, user.gender, user.birthdate, user.phonenumber, user.cardId];
            db.query(query, queryVar, (error, results) => {
                if (error) {
                    console.log("not working : ", error)
                    reject(error);
                }
                resolve(results);
            });
        }).then((results) => {
            return new Promise((resolve, reject) => {// get all users 
                db.query('SELECT * FROM user WHERE user_id = ?', [results.insertId], (error, results) => {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    resolve(results)
                })
            })
        }).then((OldResults) => {
            return new Promise((resolve, reject) => {//set userType 
                db.query("SELECT * FROM parent WHERE user_id = ?", [parentId], (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error)
                    }
                    OldResults[0].parentId = results[0].parent_id
                    resolve(OldResults)
                });
            })
        }).then((OldResults) => {
            return new Promise((resolve, reject) => {//set userType 
                db.query("INSERT INTO student (user_id, parent_id) VALUES (?, ?)", [OldResults[0].user_id, OldResults[0].parentId], (error, results) => {
                    if (error) {
                        console.log(error);
                        reject(error)
                    }
                    resolve(OldResults)
                });
            })
        });
    });
}

module.exports = { registerChild }