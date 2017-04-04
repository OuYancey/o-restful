const restify = require('restify')
const server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())

const oyao = require('./oyao')

server.get('/api/time', oyao.getTime)
server.get('/api/bing_daily_pic_url', oyao.getBingDailyPicUrl)

server.listen(2017, () => console.log(`restful server start @${new Date()}`))