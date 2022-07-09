const express = require("express")
const path = require('path')
const bot = require('./index')

const app = express()
const port = 3000

app.get('/bot', async (req, res) => {
    const channel = req.query.channel
    const word = req.query.word
    await bot.main(channel, word)
    res.send("Executed!")
})
// 
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})