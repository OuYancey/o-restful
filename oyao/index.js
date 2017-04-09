const request = require('request')
const mongoose = require('../mongodb')
const util = require('../util')

const BingDailyImage = mongoose.BingDailyImage

const getBingDailyPicUrl = (req, res, next) => {
    const content = {
        date: req.query.date || util.formatDate(util.getLastDay(new Date())),
        size: req.query.size,
        market: req.query.market
    }

    function callback(err, docs) {
        if (!err) {
            res.send(docs.map((doc) => {
                return {
                    url: doc.url.replace('1920x1080', content.size ? content.size : '1920x1080'),
                    copyright: doc.copyright,
                    name: doc.name
                }
            }))
        } else {
            res.send(err)
        }
    }

    BingDailyImage.find({
        startdate: content.date
    }, callback)

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
    getBingDailyPicUrl: getBingDailyPicUrl,
    getDailyExpenditure: getDailyExpenditure
}