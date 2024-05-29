const apiKey = 'R54H609A428WL20K';
const stocks = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', points: 65 },
    { symbol: 'COIN', name: 'Coinbase Global Inc', points: 55 },
    { symbol: 'TSLA', name: 'Tesla Inc', points: 45 }
];

async function fetchStockData(stock) {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`);
    const data = await response.json();
    return data['Global Quote'];
}

async function displayStocks() {
    const stockContainer = document.getElementById('stock-container');
    const stockData = await Promise.all(stocks.map(stock => fetchStockData(stock)));

    const stockInfo = stocks.map((stock, index) => {
        const price = parseFloat(stockData[index]['05. price']).toFixed(2);
        const changePercent = parseFloat(stockData[index]['10. change percent']).toFixed(1);
        return {
            ...stock,
            price,
            changePercent
        };
    });

    stockInfo.forEach(stock => {
        const stockCard = document.createElement('div');
        stockCard.className = 'stock-card';
        stockCard.innerHTML = `
            <h2>${stock.name} (${stock.symbol})</h2>
            <p>Price: $${stock.price}</p>
            <p>Change: ${stock.changePercent}%</p>
            <div class="health-bar">
                <div class="health-bar-inner" style="width: ${stock.points}%;"></div>
            </div>
            <p>${stock.points} points</p>
        `;
        stockContainer.appendChild(stockCard);
    });
}

document.addEventListener('DOMContentLoaded', displayStocks);
