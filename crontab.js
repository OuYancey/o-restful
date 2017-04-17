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

const getSingleMarketInfo = (market) => {
    return new Promise((resolve, reject) => {
        request(`${GLOBAL_BING_HOST}${BING_QUERY_API}${QUERY_PARAM}${market}`, (error, response, body) => {
            if (error) reject(error)
            resolve(body)
        })
    })
}

const getAllMarketInfos = async () => {
    let markets = MARKETS.map((market) => getSingleMarketInfo(market))
    let results = await Promise.all(markets)
    return results
}

const getUniqImages = (data) => {
    let dailyImages = []
    data.forEach((item, itemIndex) => {
        JSON.parse(item).images.forEach((image) => {
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
    let data = await getAllMarketInfos()
    let uniqImages = getUniqImages(data)
    await saveImages(uniqImages)
    mongoose.disconnect()
}

init()

// const saveImages = (images) => {
//     images.forEach((image) => {
//         BingDailyImage.find({
//             name: image.name
//         }, (err, docs) => {
//             if (!err) {
//                 if (docs.length === 0) {
//                     image.save((e) => count++)
//                 } else {
//                     count++
//                 }
//             } else {
//                 count++
//                 console.error(err)
//             }
//         })
//     })
// }
// 
// const getUniqImages = (images) => {
//     let map = Object.create(null)
//     images.forEach((image) => {
//         // Chinese first
//         if (image.market === 'zh-cn') {
//             map[image.name] = image
//             return
//         }
//         if (!(image.name in map)) {
//             map[image.name] = image
//         }
//     })
//     return Object.keys(map).map(key => map[key])
// }

// let timer = setInterval(() => {
//     console.log(`get images number: ${dailyImages.length}, target number: ${(MARKETS.length - failCount) * NUMBER}`)
//     if (dailyImages.length === (MARKETS.length - failCount) * NUMBER) {
//         clearInterval(timer)
//         let uniqImages = getUniqImages(dailyImages)
// 		saveImages(uniqImages)
//         let timer2 = setInterval(() => {
//             console.log('get images number: ' + count)
//         	if (count === uniqImages.length) {
//         		clearInterval(timer2)
// 		        mongoose.disconnect()
//         	}
//         }, 100)
//     }
// }, 100)