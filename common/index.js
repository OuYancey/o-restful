const mongoose = require('../mongodb')
const util = require('../util')

const BingDailyImage = mongoose.BingDailyImage

const getTime = (req, res, next) => {
    res.send(new Date().toLocaleString())
}

const getBingDailyPicUrl = (req, res, next) => {
    const content = {
        startdate: req.query.startdate,
        size: req.query.size,
        number: Number(req.query.number)
    }

    function callback(err, docs) {
        res.charSet('utf-8')
        
        if (err) res.send(err)
        res.send(docs.map((doc) => {
            return {
                url: doc.url.replace('1920x1080', content.size ? content.size : '1920x1080'),
                copyright: doc.copyright,
                name: doc.name
            }
        }))
    }

    let conditions = {}
    if (content.startdate) {
        conditions = { startdate: content.startdate }
    }

    BingDailyImage.find(conditions, null, { limit: content.number }, callback)

    console.log('getBingDailyPicUrl:', content)
}

const getDailyExpenditure = (req, res, next) => {
    const content = {
        start: req.query.start,
        end: req.query.end,
        type: req.query.type
    }
}

module.exports = {
    getTime,
    getBingDailyPicUrl,
    getDailyExpenditure
}
