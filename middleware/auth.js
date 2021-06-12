const jwt = require('jsonwebtoken')


module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if token exist
  if (!token) {

    return res.status(401).json({
      msg: 'No token, Auth failed'
    })
  }


  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload.user
    next()

  } catch (error) {
    return res.status(401).json({
      msg: 'Invalid token'
    })
  }
}