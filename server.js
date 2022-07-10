const express = require("express")
const queue = require('express-queue');
const path = require('path')
const bot = require('./index')


const app = express()
const port = process.env.PORT


app.get('/bot', async (req, res) => {
    const channel = req.query.channel
    const word = req.query.word
    await bot.main(channel, word)
    res.send("Executed!")
})
app.use(queue({ activeLimit: 1``, queuedLimit: -1 }));
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})