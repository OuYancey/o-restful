const restify = require('restify')
const mongoose = require('./mongodb')
const oyao = require('./oyao')
const wx = require('./wx')

const server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.get('/api/time', (req, res, next) => res.send(new Date().toLocaleString()))

server.get('/api/bing_daily_pic_url', oyao.getBingDailyPicUrl)
server.get('/api/daily_expenditure', oyao.getDailyExpenditure)

server.listen(2017, () => console.log(`restful server start @${new Date()}`))