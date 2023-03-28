const jwt = require('jsonwebtoken');
/*exports.verifyToken = async (req, res, next) => {
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, authData) => {
     if (err) {
       res.status(403).send({error: 'invalid token'});
    } else {
       // Save authData to request object for use in route handler 
       req.authData = authData;
       next();
     }
   });
    
 }*/
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