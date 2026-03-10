async function loadPortfolio(){

const response = await fetch("../data/market_data.json")
const json = await response.json()

document.getElementById("portfolio_value").innerHTML =
"Portfolio Value: $" + json.portfolio_value

let html = ""

let labels = []
let values = []

for(const ticker in json.positions){

const p = json.positions[ticker]

labels.push(ticker)
values.push(p.value)

html += `
<div>

<h3>${ticker}</h3>

Price: ${p.price}<br>
Shares: ${p.shares}<br>
Value: ${p.value}<br>
Daily change: ${p.change_1d}%<br>
Trend: ${p.trend}

</div>
`
}

document.getElementById("positions").innerHTML = html

drawChart(labels,values)

}

function drawChart(labels,values){

const ctx = document.getElementById("chart")

new Chart(ctx,{
type:'pie',
data:{
labels:labels,
datasets:[{
data:values
}]
}
})

}

loadPortfolio()
