const jwt = require('jsonwebtoken')

const verifyToken=(token, callback)=> {
  if (!token) {
    return callback('No token provided', null);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return callback('Failed to authenticate token', null);
    }
    console.log(decoded)
    callback(null, decoded);
  });
}

module.exports = { verifyToken };
