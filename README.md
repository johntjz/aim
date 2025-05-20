# Stock Ranking

This project fetches and displays stock prices and their percentage changes using the Alpha Vantage API. It also shows a health bar for each stock based on its points.

## Files

- `index.html`: The main HTML file.
- `styles.css`: The CSS file for styling.
- `script.js`: The JavaScript file to fetch and display stock data.

## How to Run

1. Open the repository in GitHub Codespaces.
2. Start a local server using `http-server` or Live Server.
3. Preview the application using the port forwarding feature.

## Dependencies

- [http-server](https://www.npmjs.com/package/http-server) (if using a simple HTTP server)

## Signal-to-Noise Ratio

The `snr_calculator.py` script computes the signal-to-noise ratio (SNR) for a stock's closing prices. Provide a CSV file that includes a `Close` column of prices.

Run the script with:

```bash
python snr_calculator.py path/to/your_data.csv
```

It outputs the SNR of the daily returns calculated from the closing prices.
