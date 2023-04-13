const adminService = require('../services/admin-service');
const userService = require('../services/user-auth-service')


function loginController (req, res){
    const admin = req.body;
    adminService.login(admin).then((results) => {
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
        secure: true
      }
      const token = adminService.createToken(results[0].admin_id)
      res.cookie('admin', token, cookieOptions);
      res.status(200).send(results[0]);
    })
    .catch((error) => {
      res.status(401).send({errMsg: "incorrect email or password"});
    });
  }

  function logoutController(req, res) {
    res.clearCookie('admin')
    res.status(200).send({ succMsg: "admin cookie is cleard" });
  }

function getAllUsersController (req, res){
    userService.getFromTable('user').then((results) => {
      res.status(200).send({ ok: true, user: results });
    })
    .catch((error) => {
      res.status(400).send({ ok: false, error: error.message });
    });
}

//Admin features
function countUsersController (req,res){
  admin = req.body;
  adminService.countUsers(admin).then((result) => {
    res.status(200).send({nbrUsers:result});
  })
  .catch((error) =>{
    res.status(400).send({error:error.message});
  })
}
  module.exports = {loginController, logoutController, getAllUsersController, countUsersController};
