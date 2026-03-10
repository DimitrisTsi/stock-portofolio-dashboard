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

drawCharts()

}

function drawCharts(){

const container = document.getElementById("charts")

for(const ticker in marketData){

const asset = marketData[ticker]

const dates = asset.dates.slice(-currentRange)
const prices = asset.prices.slice(-currentRange)

const card = document.createElement("div")
card.className = "card"

const title = document.createElement("h3")
title.innerText = ticker

const canvas = document.createElement("canvas")

card.appendChild(title)
card.appendChild(canvas)

container.appendChild(card)

const ctx = canvas.getContext("2d")

new Chart(ctx,{
type:"line",
data:{
labels:dates,
datasets:[{
data:prices,
borderColor:"#38bdf8",
borderWidth:2,
pointRadius:0
}]
},
options:{
responsive:true,
plugins:{legend:{display:false}},
scales:{
x:{display:false},
y:{display:true}
}
}
})

}

}

loadData()
