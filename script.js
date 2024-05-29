const apiKey = 'R54H609A428WL20K';
const stocks = ['NVDA', 'COIN', 'TSLA'];
const apiUrl = 'https://api.twelvedata.com/price?symbol=';

async function fetchStockData(stock) {
    const response = await fetch(`${apiUrl}${stock}&apikey=${apiKey}`);
    const data = await response.json();
    return data;
}

async function fetchStockChange(stock) {
    const response = await fetch(`https://api.twelvedata.com/price_change_percentage?symbol=${stock}&interval=1day&apikey=${apiKey}`);
    const data = await response.json();
    return data;
}

async function displayStocks() {
    const stockContainer = document.getElementById('stock-container');
    const stockData = await Promise.all(stocks.map(stock => fetchStockData(stock)));
    const stockChanges = await Promise.all(stocks.map(stock => fetchStockChange(stock)));

    const stockInfo = stocks.map((stock, index) => {
        return {
            symbol: stock,
            price: parseFloat(stockData[index].price).toFixed(2),
            change: parseFloat(stockChanges[index].price_change_percentage).toFixed(2)
        };
    });

    stockInfo.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));

    stockInfo.forEach(stock => {
        const stockCard = document.createElement('div');
        stockCard.className = 'stock-card';
        stockCard.innerHTML = `
            <h2>${stock.symbol}</h2>
            <p>Price: $${stock.price}</p>
            <p>Change: ${stock.change}%</p>
        `;
        stockContainer.appendChild(stockCard);
    });
}

displayStocks();
