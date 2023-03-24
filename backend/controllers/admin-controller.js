const adminService = require('../services/admin-service');


function loginController (req, res){
    const admin = req.body;
    if( !admin.email || !admin.password ) {
      return res.status(200).send({
        errMsg: 'Please provide an email and password'
      })
    };
    adminService.login(admin).then((results) => {
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true
      }
      const token = adminService.createToken(results[0].admin_id)
      res.cookie('admin', token, cookieOptions);
      res.status(200).send(results[0]);
    })
    .catch((error) => {
      res.status(200).send({errMsg: "incorrect email or password"});
    });
  }

function getAllUsersController (req, res){
    adminService.getAllUsers().then((results) => {
      res.status(200).send({ ok: true, user: results });
    })
    .catch((error) => {
      res.status(400).send({ ok: false, error: error.message });
    });
}
  module.exports = {loginController, getAllUsersController};
