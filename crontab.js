const mongoose = require('mongoose')
const db = require('./mongodb')
const request = require('request')

const BingDailyImage = mongoose.model('BingDailyImage', {
	title: String,
	host: String,
	urlBase: String,
	date: String
})

request('http://cn.bing.com/HPImageArchive.aspx?format=js&n=1', (error, response, body) => {
    if (!error) {
        const data = JSON.parse(body)
        const image = data.images[0]
        const dailyImage = new BingDailyImage({
        	title: image.copyright,
        	host: 'http://cn.bing.com',
        	urlBase: image.urlbase,
        	date: image.startdate
        })
        dailyImage.save((err) => console.error(err))
    } else {
    	console.error(error)
    }
})
