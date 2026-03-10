async function loadPortfolio() {

try {

const response = await fetch("data/market_data.json")
const data = await response.json()

console.log(data)

document.getElementById("portfolio_value").innerText =
"Portfolio Value: $" + data.portfolio_value

let html = ""

for (const ticker in data.positions) {

const p = data.positions[ticker]

html += `
<div style="margin-bottom:20px">

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

} catch (error) {

console.error("Dashboard error:", error)

}

}

loadPortfolio()
