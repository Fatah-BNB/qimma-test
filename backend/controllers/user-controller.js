const userService = require('../services/user-service');

async function registerController (req, res){
  console.log('req.bode', req.body);
  if(!(typeof req.body.userType === "undefined")){
    const user = req.body;
    await userService.register(user).then(() => {
      res.status(200).send({succMsg: "Account created" });
    })
    .catch((error) => {
      res.status(200).send({errMsg: "Faild to create account"});
      console.log(error)
    });
  }else{res.status(200).send({errMsg: "please specifiy a user type" })}
}

function loginController (req, res){
  const user = req.body;
  if( !user.email || !user.password ) {
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
    res.status(200).send({errMsg: "email or password incorrect"});
  });
}


function logoutController(req, res){
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 1*1000),
    httpOnly: true
  });
  res.status(200).send({message: "cookie is cleard"});
}
function profileController(req, res){
  res.status(200).send({ ok: true});
 
}

module.exports = {registerController, loginController, profileController, logoutController};
