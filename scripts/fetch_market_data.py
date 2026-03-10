import yfinance as yf
import json

with open("data/portfolio.json") as f:
    config = json.load(f)

tickers = config["tickers"]

print("Downloading:", tickers)

data = yf.download(tickers, period="1y", group_by="ticker")

results = {}

for ticker in tickers:

    try:

        df = data[ticker]["Close"].dropna()

        if df.empty:
            print("No data:", ticker)
            continue

        results[ticker] = {
            "dates": df.index.strftime("%Y-%m-%d").tolist(),
            "prices": df.round(2).tolist(),
            "latest_price": float(df.iloc[-1])
        }

        print("Loaded:", ticker)

    except Exception as e:
        print("Error:", ticker, e)

with open("data/market_data.json","w") as f:
    json.dump(results,f,indent=2)

print("Saved market_data.json")
