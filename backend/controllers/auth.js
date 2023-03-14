const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password ) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }

    db.query('SELECT * FROM user WHERE user_email = ?', [email], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].user_password)) ) {
        console.log("prblm")
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
      } else {
        console.log(results[0].user_firstname)
        const id = results[0].user_id;
        //create a token for the user
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        //set a cookie for the user 
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.register = (req, res) => {
  //console.log(req.body);
  const userType = req.body.exampleRadios;
  const { firstname, lastname, email, password, passwordConfirm, birthdate, gender, phoneNum } = req.body;

  db.query('SELECT user_email FROM user WHERE user_email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }

    if( results.length > 0 ) {
      return res.render('register', {
        message: 'That email is already in use'
      })
    } else if( password !== passwordConfirm ) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    //console.log(hashedPassword);

    db.query('INSERT INTO user (user_email, user_password, user_firstname, user_lastname, user_gender, user_birthDate, user_phoneNumber) values(?,?,?,?,?,?,?)',
    [email, hashedPassword, firstname, lastname, gender, birthdate, phoneNum], (error, results) => {
      if(error) {
        console.log("faild to insert into user\n",error);
      } else {  
        const userId = results.insertId;
        db.query('INSERT INTO '+userType+' SET ?', {User_id: userId}, (error, results) => {
          if(error) {
            console.log(error);
          }
        });
        return res.render('register', {
          sucMessage: 'User registered'
        });
      }
    })



  });

}

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if( req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
      process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
      db.query('SELECT * FROM user WHERE user_id = ?', [decoded.id], (error, result) => {
        console.log(result);

        if(!result) {
          return next();
        }

        req.user = result[0];
        console.log("user is")
        console.log(req.user);
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

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
}