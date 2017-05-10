const mongoose = require('../mongodb')
const util = require('../util')

const Task = mongoose.Task

const task = (req, res, next) => {
    if (req.method === 'POST') {
        console.log('Task create')
        new Task({
            createTime: new Date(),
            type: req.params.type,
            content: req.params.content,
            duration: req.params.duration,
            isEnd: req.params.isEnd
        }).save((err, doc) => {
            if (err) res.send(500)
            res.send(doc)
        })
    } else if (req.method === 'PUT') {
        console.log(req.params)
    }
}

module.exports = {
    task
}