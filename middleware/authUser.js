const jwt = require('jsonwebtoken')

const authenticateUser =(req,res,next) =>{
    const token = req.headers['token'];
  if (!token) {
    return res.status(403).json({ status: false, message: 'No token provided' });
  }

  jwt.verify(token,process.env.JWT_SECRET_KEY , (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userid; 
    next();
  });
}

module.exports={authenticateUser}