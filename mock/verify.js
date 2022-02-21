const jwt = require('jsonwebtoken')

const SECRET_KEY = '123456789'
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}
const urls = [/\/users\/[0-9]+/, /\/permission_routes/]
function isUrlAllowed(url) {
  return urls.some((urlRegex) => urlRegex.test(url))
}

module.exports = function (req, res, next) {
  if (isUrlAllowed(req.url)) {
    const token = req.headers.authorization
    if (!token) {
      res.status(401).jsonp({ code: 401, msg: '请先登录' })
      return
    }
    try {
      const result = verifyToken(token)
      if (result.exp < Date.now() / 1000) {
        res.status(401).jsonp({ code: 401, msg: '登录已过期' })
        return
      }
      next()
    } catch (error) {
      res.status(401).jsonp({ code: 401, msg: '登录已过期' })
    }
  } else {
    next()
  }
}
