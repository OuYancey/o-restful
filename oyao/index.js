const request = require('request')
const mongoose = require('../mongodb')

const BingDailyImage = mongoose.BingDailyImage

const getBingDailyPicUrl = (req, res, next) => {
    const content = {
        size: req.query.size,
        date: req.query.date || '20170401',
        market: req.query.market || 'zh-cn'
    }

    function callback(err, docs) {
        if (!err) {
            if (content.size) {
                res.send(docs.map((doc) => {
                    return {
                        url: doc.url.replace('1920x1080', content.size)
                    }
                }))
            }
        } else {
            res.send(err)
        }
    }

    BingDailyImage.find({
        startdate: content.date,
        market: content.market
    }, callback)
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