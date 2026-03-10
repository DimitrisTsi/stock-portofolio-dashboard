import yfinance as yf
import json
import pandas as pd
from datetime import datetime

with open("data/portfolio.json") as f:
    portfolio = json.load(f)

positions = portfolio["positions"]

tickers = [p["ticker"] for p in positions]

data = yf.download(tickers, period="1y", group_by="ticker")

results = {}

total_value = 0

for p in positions:

    ticker = p["ticker"]
    shares = p["shares"]

    df = data[ticker]["Close"].dropna()

    price = float(df.iloc[-1])
    prev = float(df.iloc[-2])

    change_1d = (price / prev - 1) * 100

    ma50 = df.tail(50).mean()
    ma200 = df.tail(200).mean()

    trend = "bullish" if ma50 > ma200 else "bearish"

    value = price * shares
    total_value += value

    results[ticker] = {
        "price": round(price,2),
        "shares": shares,
        "value": round(value,2),
        "change_1d": round(change_1d,2),
        "ma50": round(ma50,2),
        "ma200": round(ma200,2),
        "trend": trend
    }

output = {
    "updated": datetime.utcnow().isoformat(),
    "portfolio_value": round(total_value,2),
    "positions": results
}

with open("data/market_data.json","w") as f:
    json.dump(output,f,indent=2)
