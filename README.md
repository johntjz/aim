# Stock Ranking

This project fetches and displays stock prices and their percentage changes using the Alpha Vantage API. It also shows a health bar for each stock based on its points.

In addition to the client side ranking demo, this repository includes a simple **signal detector** that pulls daily ETF data from [Moomoo top gainers](https://www.moomoo.com/quote/etf-us/top-gainers). The detector classifies rows as _signal_ or _noise_ based on change percentage and volume.

## Files

- `index.html`: The main HTML file.
- `styles.css`: The CSS file for styling.
- `script.js`: The JavaScript file to fetch and display stock data.
- `signalDetector.js`: Node script that fetches top gainers and prints signal vs noise.

## How to Run

1. Open the repository in GitHub Codespaces.
2. Run `npm install` to install dependencies.
3. Start a local server using `http-server` or Live Server to view the demo.
4. Execute `npm run build` to fetch the ETF top gainers and see signal output in the console.

## Dependencies

- [http-server](https://www.npmjs.com/package/http-server) (if using a simple HTTP server)
- `axios` and `cheerio` for server-side scraping
