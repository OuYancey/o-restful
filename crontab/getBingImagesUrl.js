const mongoose = require('../mongodb')
const axios = require('axios')

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

const getMarketsResponses = async () => {
    // | 在
    // | 这
    // | 里
    // v
    let markets = MARKETS.map((market) => axios.get(`${GLOBAL_BING_HOST}${BING_QUERY_API}${QUERY_PARAM}${market}`))
    return await Promise.all(markets)
}

const getUniqImages = (responses) => {
    let dailyImages = []
    responses.forEach((response, itemIndex) => {
        response.data.images.forEach((image) => {
            if (!hasMarketImage(image.url, MARKETS[itemIndex])) return
            dailyImages.push(
                new BingDailyImage({
                    url: `${CN_BING_HOST}${image.url}`,
                    urlbase: image.urlbase,
                    name: image.urlbase.match(/\w+(?=_)/g)[0],
                    copyright: image.copyright,
                    market: MARKETS[itemIndex],
                    startdate: image.startdate,
                    fullstartdate: image.fullstartdate
                })
            )
        })
    })
    return dailyImages
}

const saveImages = async (images) => {
    for (let i = 0; i < images.length; i++) {
        let docs = await BingDailyImage.find({ name: images[i].name })
        if (docs.length === 0) {
            await images[i].save()
        }
    }
}

const init = async () => {
    let responses = await getMarketsResponses()
    let uniqImages = getUniqImages(responses)
    await saveImages(uniqImages)
    mongoose.disconnect()
}

init()
