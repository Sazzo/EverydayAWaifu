require('dotenv').config()
const twit = require('twit')
const fs = require('fs')
const waifus = require('./waifus')
const schedule = require('node-schedule')
const client = new twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
})
const job = schedule.scheduleJob({hour: 12, minute: 30, dayOfWeek: 0}, function () {
    const waifu = waifus[Math.floor(Math.random() * waifus.length)]
    let content = fs.readFileSync(waifu.image, { encoding: 'base64'})
    client.post('media/upload', { media_data: content}, function (err, data, response) {
    if(err) return console.log(err)
    client.post('statuses/update', { status: waifu.name, media_ids: new Array(data.media_id_string)}, function(err, data) {
        if(err) return console.log(err)
        console.log(data)
    })
})
})
