const restify = require('restify')
const mongoose = require('./mongodb')
const common = require('./common')
const oyao = require('./oyao')
const wx = require('./wx')

const server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.CORS())

server.get('/api/time', common.getTime)
server.get('/api/bing_daily_pic_url', common.getBingDailyPicUrl)
server.get('/api/daily_expenditure', common.getDailyExpenditure)

server.post('/api/oyao/task', oyao.task)
server.put('/api/oyao/task', oyao.task)

server.listen(2017, () => console.log(`restful server start @${new Date()}`))