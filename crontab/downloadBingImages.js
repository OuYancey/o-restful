const axios = require('axios')
const fs = require('fs')
const path = require('path')
const mongoose = require('../mongodb')
const util = require('../util')

const PICS_DIR_PATH = path.join(process.argv[1], `../../asset/`) 
const BingDailyImage = mongoose.BingDailyImage

const downloadEveryDayImages = async (date) => {
    let docs = await BingDailyImage.find({ startdate: date })
    if (docs.length === 0) return

    let docsPromises = docs.map((doc) => axios({ method:'get', url:doc.url, responseType:'stream'}))
    let responses = await Promise.all(docsPromises)
    responses.forEach((response, index) => {
        let imgPath = `${PICS_DIR_PATH}${date}.${docs[index].market}.jpg`
        response.data.pipe(fs.createWriteStream(imgPath))
        console.log(`==> save ${imgPath} ok! `)
    })
}

const downloadImages = async (days) => {
    let promises = []
    for (let i = 0; i < days; i++) {
        let date = util.formatDate(new Date((new Date().getTime() - 24 * 60 * 60 * 1000 * i)))
        promises.push(downloadEveryDayImages(date))
    }
    await Promise.all(promises)
}

const init = async () => {
    console.log(`--- start download @ ${new Date()} ---`)
    await downloadImages(7)
    mongoose.disconnect()
    console.log(`--- end download @ ${new Date()} ---`)
}

init()
