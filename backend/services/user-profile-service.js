const db = require('../db');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT user_email, user_password, user_firstName, '
            + 'user_lastName, user_birthDate, user_phoneNumber, user_picture, user_card_id, wilaya_name '
            + 'FROM user INNER JOIN wilaya ON user.wilaya_code = wilaya.wilaya_code where user.user_id = ?'
        db.query(query, [userId], (error, results) => {
            if (error) {
                console.log("cannot get user info", error)
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

function updateField(userId, field, value) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE user SET ${field} = ? WHERE user_id = ?`, [value, userId], (error, results) => {
            if (error) {
                console.log("cannot update " + field + ": ", error)
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

function updateUserInfo(userId, user) {
    let updateFields = user;
    let params = [];
    let fieldMap = {
        user_firstName: "user_firstName = ?",
        user_lastName: "user_lastName = ?",
        user_birthDate: "user_birthDate = ?",
        user_phoneNumber: "user_phoneNumber = ?",
        user_card_id: "user_card_id = ?",
        wilaya_code: "wilaya_code = ?"
    };

    let fieldList = Object.keys(updateFields).map((fieldName) => {
        if (fieldMap[fieldName]) {
            params.push(updateFields[fieldName]);
            return fieldMap[fieldName];
        }
    }).filter((item) => item).join(", ");
    return new Promise((resolve, reject) => {// update user table
        let sqlQuery = `UPDATE user SET ${fieldList} WHERE user_id = ?`;
        params.push(userId);
        db.query(sqlQuery, params, (error, results) => {
            if (error) {
                console.log("cannot update ", error)
                reject(error)
            } else {
                resolve(results)
            }
        })
    })  
}
module.exports = { getUserInfo, updateField, updateUserInfo }