const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const DB_ADDRESS = 'mongodb://127.0.0.1:27017/oyao'
mongoose.connect(DB_ADDRESS)

const db = mongoose.connection
db.on('error', (err) => console.error(`mongodb connection err: ${err}`))
db.on('open', () => console.log(`mongodb connection ok @${new Date()}`))

mongoose.BingDailyImage = mongoose.model('BingDailyImage', {
    url: String,
    urlbase: String,
    name: String,
    copyright: String,
    market: String,
    startdate: String,
    fullstartdate: String
})

mongoose.DailyExpenditure = mongoose.model('DailyExpenditure', {
	date: Date,
	type: String,
	desc: String,
	money: Number,
	id: String
})

mongoose.Task = mongoose.model('Task', {
    createTime: Date,
    type: String,
    content: String,
    duration: Number,
    isEnd: Boolean
})

module.exports = mongoose