const jwt = require('jsonwebtoken');
const { promisify } = require('util');
exports.verifyToken = async (req, res, next) => {
  try{
    //1) verify the token
    const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    //console.log('decoded',  decoded);
    return next();
  }catch(error){
    return res.status(400).send({error: error})
  }
    
}