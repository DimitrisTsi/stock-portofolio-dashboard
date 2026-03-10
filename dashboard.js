let marketData = {}
let currentRange = 365

const names = {

NVDA:"NVIDIA",
MSFT:"Microsoft",
AMD:"Advanced Micro Devices",
BABA:"Alibaba",
"VUAA.L":"Vanguard S&P 500 UCITS ETF",
"EUNL.DE":"iShares Core MSCI World UCITS ETF",
"SEMI.AS":"iShares MSCI Global Semiconductors ETF"

}

async function loadData(){

const response = await fetch("data/market_data.json")
marketData = await response.json()

drawCharts()

}

function setRange(days){

currentRange = days

document.getElementById("charts").innerHTML=""

drawCharts()

}

function drawCharts(){

const container = document.getElementById("charts")

for(const ticker in marketData){

const asset = marketData[ticker]

const dates = asset.dates.slice(-currentRange)
const prices = asset.prices.slice(-currentRange)

const first = prices[0]
const last = prices[prices.length-1]

const pct = ((last-first)/first*100).toFixed(2)

const card = document.createElement("div")
card.className="card"

const title = document.createElement("h3")
title.innerText = `${names[ticker]} (${ticker})`

const change = document.createElement("div")
change.innerText = `${pct>0?"+":""}${pct}%`
change.className = pct>=0 ? "change positive":"change negative"

const canvas = document.createElement("canvas")

card.appendChild(title)
card.appendChild(change)
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

plugins:{
legend:{display:false},
tooltip:{
callbacks:{
label:(context)=>"$"+context.parsed.y
}
}
},

scales:{

x:{
display:true,
ticks:{
maxTicksLimit:6
}
},

y:{
display:true,
ticks:{
callback:(value)=>"$"+value
}
}

}

}

})

}

}

loadData()
