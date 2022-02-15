const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const verify = require('./verify')

// bodyParser
server.use(bodyParser.json())
// rewrites
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
)

//jwt
const SECRET_KEY = '123456789'
const EXPIRES_IN = '1h'
const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN })
}

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults()
server.use(middlewares)

// 验证token
server.use(verify)

server.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    const token = createToken({ username, password })
    res.status(200).json({
      code: 0,
      data: { token },
      msg: 'success',
    })
  } else {
    res.status(200).json({ code: 1, msg: '用户名或密码错误' })
  }
})

server.post('/logout', (req, res) => {
  res.status(200).json({ code: 0, msg: 'success' })
})

// 支持加载多个db json文件
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach(function (file) {
  base[file.replace('.json', '')] = require(path.join(mockDir, file))
})
const router = jsonServer.router(base)
server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    code: 0,
    msg: 'success',
  })
}

server.listen(4000, () => {
  console.log(`JSON Server is running at http://localhost:4000`)
})
