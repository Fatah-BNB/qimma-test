const jwt = require('jsonwebtoken');
function verifyToken(userType){
  return function verifyTokenMiddleware(req, res, next){
    const token = req.cookies.jwt;
    if(!token){
      res.status(403).send({error: 'Token not found'});
    }
    try{
      const authData = jwt.verify(token, process.env.JWT_SECRET);
      if (authData.userType !== userType) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.authData = authData;
      next()
    }catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
module.exports = {verifyToken}