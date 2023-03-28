const bcrypt = require('bcrypt');
const db = require('../db');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

function registerChild(user, parentId) {
    console.log("register called")
    return bcrypt.hash(user.password, 8).then((hash) => {
        console.log("password crypted")
        return new Promise((resolve, reject) => {//insert new user to user table
            const query = "INSERT INTO user (user_email, user_password, user_firstName, user_lastName, user_gender, user_birthDate, user_phoneNumber, user_card_id, wilaya_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const queryVar = [user.email, hash, user.firstname, user.lastname, user.gender, user.birthdate, user.phonenumber, user.cardId, user.wilaya_code];
            db.query(query, queryVar, (error, results) => {
                if (error) {
                    console.log("not working : ", error)
                    reject(error);
                }
                resolve(results);
            });
        }).then((OldResults) => {
            return new Promise((resolve, reject) => {//set userType 
                db.query("INSERT INTO student (user_id, parent_id) VALUES (?, ?)", [results.insertId, parentId], (error, results) => {
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
function ChildrenAccounts(parentId){
    return new Promise((resolve, reject) => {// get all children accounts related to parent id
        const query = "SELECT user_email, user_firstName, user_lastName, user_gender, user_birthDate, wilaya_code, tier  FROM user INNER JOIN student ON user.user_id = student.user_id  INNER JOIN parent ON student.parent_id = parent.parent_id  WHERE parent.parent_id  = ?"
        const queryVar = [parentId]
        db.query(query,queryVar, (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(results)
        })
    })
}

module.exports = { registerChild, ChildrenAccounts }