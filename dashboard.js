let charts = []
let marketData = {}
let currentRange = 365

async function loadData(){

const response = await fetch("data/market_data.json")
marketData = await response.json()

drawCharts()

}

function setRange(days){

currentRange = days

document.getElementById("charts").innerHTML = ""
charts = []

drawCharts()

}

function drawCharts(){

const container = document.getElementById("charts")

for(const ticker in marketData){

const asset = marketData[ticker]

const dates = asset.dates.slice(-currentRange)
const prices = asset.prices.slice(-currentRange)

const canvas = document.createElement("canvas")
canvas.height = 120

const card = document.createElement("div")
card.className = "card"

const title = document.createElement("h3")
title.innerText = ticker + " — $" + asset.latest_price

card.appendChild(title)
card.appendChild(canvas)

container.appendChild(card)

new Chart(canvas,{
type:'line',
data:{
labels:dates,
datasets:[{
data:prices,
borderWidth:2,
fill:false
}]
},
options:{
responsive:true,
plugins:{legend:{display:false}},
scales:{
x:{display:false}
}
}
})

}

}

loadData()
