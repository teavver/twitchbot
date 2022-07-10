const countries = require('./countries.json')
const tmi = require('tmi.js')
require('dotenv').config()

  const tokens = [process.env.TOKEN, process.env.TOKEN2]
  const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
//   const word = "input"
  const splitEmoji = (string) => [...new Intl.Segmenter().segment(string)].map(x => x.segment)
  let outputArray = []
//   let channelName = "teaver2"
  let current = 0


  async function createBot(token, channelName){

    const opts = {
        identity: {
          username: 'bot',
          password: token
        },
        channels: [
          channelName
        ]
      };

    const client = new tmi.client(opts);
    await client.connect()

    client.on('connected', onConnectedHandler);
    function onConnectedHandler (addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }

    return client
  }



async function main(channelName, word){
    
    const newSplit = splitEmoji(word)
    console.log(newSplit)

    newSplit.forEach(letter => {
        // string case
        if(!regexExp.test(letter)) {
            const letterLower = letter.toLowerCase()
            outputArray.push(countries[letterLower])
        }
        else{
            // emoji case
            outputArray.push(letter)
        }
    });

    const bots = await Promise.all(
    tokens.map(token => createBot(token))
    )  
    
    for (let i = 0; i < outputArray.length; i++) {
        bots[current].say(channelName, outputArray[i])
        current++
        if(current === bots.length) current = 0
        await sleep(600)
    }
    await sleep(500)

    for (let i = 0; i < bots.length; i++) {
        bots[i].say(channelName,"!vanish")
        bots[i].disconnect()
        outputArray = []
        await sleep(1400)
    }
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}


module.exports = {
    main
}



