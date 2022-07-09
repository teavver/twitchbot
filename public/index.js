const btnActivate = document.getElementById("act")

const word = document.getElementById("word")
const channel = document.getElementById("channel")

btnActivate.addEventListener("click", async e => {
    const response = await fetch(`/bot?channel=${channel.value}&word=${word.value}`)
    console.log(response)
})

