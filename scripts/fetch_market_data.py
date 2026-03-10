import yfinance as yf
import json

with open("data/portfolio.json") as f:
    config = json.load(f)

tickers = config["tickers"]

results = {}

for ticker in tickers:

    try:

        df = yf.download(ticker, period="1y")

        if df.empty:
            print(f"No data for {ticker}")
            continue

        closes = df["Close"].dropna()

        results[ticker] = {
            "dates": closes.index.strftime("%Y-%m-%d").tolist(),
            "prices": closes.round(2).tolist(),
            "latest_price": float(closes.iloc[-1])
        }

    except Exception as e:
        print(f"Failed {ticker}: {e}")

with open("data/market_data.json","w") as f:
    json.dump(results,f,indent=2)
