const userService = require('../services/user-service');
const jwt = require('jsonwebtoken');



function registerController(req, res) {
  console.log('req.bode', req.body);
  if (!(typeof req.body.userType === "undefined")) {
    const user = req.body;
    userService.register(user).then(async (results) => {//after the user register the server send an email to the user
      //1) create token for email 
      const emailToken = userService.createEmailToken(results[0].user_firstName, results[0].user_id);
      //2) send the email
      userService.sendEmail(results[0].user_firstName, results[0].user_email, emailToken);
      res.status(200).send({ succMsg: "Account created", results: results[0] });
    })
      .catch((error) => {
        res.status(401).send({ errMsg: "Faild to create account" });
        console.log(error)
      });
  } else { res.status(401).send({ errMsg: "please specifiy a user type" }) }
}

function loginController(req, res) {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(200).send({
      errMsg: 'Please provide an email and password'
    })
  };
  userService.login(user).then((results) => {
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true
    }
    const token = userService.createToken(results[0].user_id)
    res.cookie('jwt', token, cookieOptions);
    res.status(200).send(results[0]);
  })
    .catch((error) => {
      res.status(401).send({ errMsg: error.message });
    });
}


function logoutController(req, res) {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true
  });
  res.status(200).send({ succMsg: "cookie is cleard" });
}
function profileController(req, res) {
  res.status(200).send({ ok: true });

}
function updateEmailStatusCntrl(req, res) {
  const token = req.params.token
  userService.updateEmailStatus(token).then(() => {
    res.status(200).send({ succMsg: "update email status" });
  })
    .catch((error) => {
      console.log(error)
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).send({ errMsg: "expired token, regenerate ur token" });
      } else {
        res.status(400).send({ errMsg: "cannot update" });
      }
    });
}
function resendEmailVerificationCntrl(req, res) {
  const email = req.body.email;
  userService.retrieveUserByEmail(email).then((results) => {//after the user register the server send an email to the user
    try {
      //1) create token for email 
      const emailToken = userService.createEmailToken(results[0].user_firstName, results[0].user_id);
      //2) send the email
      userService.sendEmail(results[0].user_firstName, email, emailToken);
      res.status(200).send({ succMsg: "check ur email"});
    } catch (error) {
      res.status(401).send({ errMsg: "Faild to send email" })
    }
  })
    .catch((error) => {
      res.status(401).send({ errMsg: "invalid email" });
      console.log(error)
    });
}

module.exports = {
  registerController, loginController,
  profileController, logoutController, updateEmailStatusCntrl, resendEmailVerificationCntrl
};
