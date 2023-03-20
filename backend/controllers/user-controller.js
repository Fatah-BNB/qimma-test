const userService = require('../services/user-service');

async function registerController (req, res){
  console.log('req.bode', req.body);
  const user = req.body;
  await userService.register(user).then((results) => {
    res.status(200).send({ ok: true, user: results });
  })
  .catch((error) => {
    res.status(400).send({ ok: false, error: error.message });
  });
}
async function loginController (req, res){
  const user = req.body;
  if( !user.email || !user.password ) {
    return res.status(400).send({
      message: 'Please provide an email and password'
    })
  };
  await userService.login(user).then((results) => {
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    }
    const token = userService.createToken(results[0].user_id)
    res.cookie('jwt', token, cookieOptions);
    res.status(200).send(results);
  })
  .catch((error) => {
    res.status(402).send({ ok: false, error: error.message });
  });
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
module.exports = {registerController, loginController, profileController, getAllUsersController};
