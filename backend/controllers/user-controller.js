const userService = require('../services/user-service');

async function registerController (req, res){
  console.log('req.bode', req.body);
  if(!(typeof req.body.userType === "undefined")){
    const user = req.body;
    await userService.register(user).then(() => {
      res.status(200).send({ ok: true, message: "user is inserted" });
    })
    .catch((error) => {
      res.status(400).send({ ok: false, error: error.message });
    });
  }else{res.status(400).send({ ok: false, error: "please specifiy a user type" });}
}

function loginController (req, res){
  const user = req.body;
  if( !user.email || !user.password ) {
    return res.status(400).send({
      message: 'Please provide an email and password'
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
    res.status(402).send({ ok: false, error: error.message });
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
async function getAllUsersController (req, res){
  userService.getAllUsers().then((results) => {
    res.status(200).send({ ok: true, user: results });
  })
  .catch((error) => {
    res.status(400).send({ ok: false, error: error.message });
  });
}
module.exports = {registerController, loginController, profileController, getAllUsersController, logoutController};
