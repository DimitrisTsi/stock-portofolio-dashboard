async function loadData(){

const response = await fetch("data/market_data.json")
const data = await response.json()

const container = document.getElementById("charts")

for(const ticker in data){

const asset = data[ticker]

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
labels: asset.dates,
datasets:[{
label:ticker,
data: asset.prices,
borderWidth:2,
fill:false
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
