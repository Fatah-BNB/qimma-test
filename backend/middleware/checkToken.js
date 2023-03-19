const db = require('../db');
const jwt = require('jsonwebtoken');
exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if( req.cookies.jwt) {
      try {
        //1) verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        console.log(decoded);
        //2) Check if the user still exists
        let userType = [];
        db.query('SELECT * FROM student WHERE User_id = ?', [decoded.id], (fields, results) => {
          //userType = fields[0].table;
          if (JSON.stringify(results).length > 2){
            userType.push("student");
          };
        });
        db.query('SELECT * FROM instructor WHERE User_id = ?', [decoded.id], (fields, results) => {
          //userType = fields[0].table;
          if (JSON.stringify(results).length > 2){
            userType.push("instructor");
          };
        });
        db.query('SELECT * FROM parent WHERE User_id = ?', [decoded.id], (fields, results) => {
          //userType = fields[0].table;
          if (JSON.stringify(results).length > 2){
            userType.push("parent");
          };
        });
        db.query('SELECT * FROM user WHERE user_id = ?', [decoded.id], (error, results, fields) => {
          console.log(results);
          if(!results) {
            return next();
          }
          req.user = results[0];
          req.userType = userType;
          return next();
        });
  
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  }