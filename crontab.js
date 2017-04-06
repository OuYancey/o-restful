const mongoose = require('./mongodb')
const request = require('request')

const BingDailyImage = mongoose.BingDailyImage

const GLOBAL_BING_HOST = 'https://global.bing.com'
const CN_BING_HOST = 'https://cn.bing.com'
const BING_QUERY_API = '/HPImageArchive.aspx?'
const NUMBER = 8
const QUERY_PARAM = `format=js&n=${NUMBER}&setmkt=`
const MARKETS = ["ar-xa", "bg-bg", "cs-cz", "da-dk", "de-at", "de-ch", "de-de", "el-gr", "en-au", "en-ca", "en-gb", 
    "en-id", "en-ie", "en-in", "en-my", "en-nz", "en-ph", "en-sg", "en-us", "en-xa", "en-za", "es-ar", "es-cl", 
    "es-es", "es-mx", "es-us", "es-xl", "et-ee", "fi-fi", "fr-be", "fr-ca", "fr-ch", "fr-fr", "he-il", "hr-hr", 
    "hu-hu", "it-it", "ja-jp", "ko-kr", "lt-lt", "lv-lv", "nb-no", "nl-be", "nl-nl", "pl-pl", "pt-br", "pt-pt", 
    "ro-ro", "ru-ru", "sk-sk", "sl-sl", "sv-se", "th-th", "tr-tr", "uk-ua", "zh-cn", "zh-hk", "zh-tw"]

const hasMarketImage = (url, market) => url.toLowerCase().indexOf(market.toLowerCase()) > -1

let count = 0
let dailyImages = []

MARKETS.forEach((market) => {
    request(`${GLOBAL_BING_HOST}${BING_QUERY_API}${QUERY_PARAM}${market}`, (error, response, body) => {
        if (!error) {
            const data = JSON.parse(body)
            data.images.forEach((image) => {
                dailyImages.push(
                    new BingDailyImage({
                        url: `${CN_BING_HOST}${image.url}`,
                        urlbase: image.urlbase,
                        name: image.urlbase.match(/\w+(?=_)/g)[0],
                        copyright: image.copyright,
                        market: market,
                        startdate: image.startdate,
                        fullstartdate: image.fullstartdate
                    })
                )
            })
        } else {
            console.log(new Date(), market, error)
        }
    })
})

const saveImages = (images) => {
    images.forEach((image) => {
        BingDailyImage.find({
            name: image.name
        }, (err, docs) => {
            if (!err) {
                if (docs.length === 0) {
                    image.save((e) => count++)
                }
            } else {
                count++
                console.error(err)
            }
        })
    })
}

const getUniqImages = (images) => {
    let map = Object.create(null)
    images.forEach((image) => {
        // Chinese first
        if (image.market === 'zh-cn') {
            map[image.name] = image
            return
        }
        if (!(image.name in map)) {
            map[image.name] = image
        }
    })
    return Object.keys(map).map(key => map[key])
}

let timer = setInterval(() => {
    if (dailyImages.length === MARKETS.length * NUMBER) {
        clearInterval(timer)
        let uniqImages = getUniqImages(dailyImages)
		saveImages(uniqImages)
        let timer2 = setInterval(() => {
        	if (count === uniqImages.length) {
        		clearInterval(timer2)
		        mongoose.disconnect()
        	}
        }, 100)
    }
}, 100)