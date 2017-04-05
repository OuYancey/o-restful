const request = require('request')

const getBingDailyPicUrl = (req, res, next) => {
    const content = {
        size: req.query.size || '480x800',
        date: req.query.date || new Date()
    }

    function callback(err, response, body) {
        if (!err) {
            const data = JSON.parse(body)
            const image = data.images[0]
            res.send({
                url: `http://cn.bing.com${image.urlbase}_${content.size}.jpg`,
                title: image.copyright
            })
            next()
        }
    }

    request('http://cn.bing.com/HPImageArchive.aspx?format=js&n=1', callback)
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