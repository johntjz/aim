const axios = require('axios');
const cheerio = require('cheerio');

async function fetchTopGainers() {
  const url = 'https://www.moomoo.com/quote/etf-us/top-gainers';
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }});
  const $ = cheerio.load(data);
  const rows = [];
  $('table tbody tr').each((i, el) => {
    const cols = $(el).find('td').map((_, td) => $(td).text().trim()).get();
    if (cols.length >= 5) {
      rows.push({
        symbol: cols[0],
        name: cols[1],
        price: parseFloat(cols[2].replace(/[$,]/g, '')),
        changePercent: parseFloat(cols[3].replace(/[%]/g, '')),
        volume: parseInt(cols[4].replace(/[,]/g, ''), 10)
      });
    }
  });
  return rows;
}

function detectSignal(rows) {
  // Very simple signal detector based on change percent and volume
  const signals = rows
    .map(row => ({
      ...row,
      score: row.changePercent * Math.log10(row.volume + 1)
    }))
    .sort((a, b) => b.score - a.score);
  const threshold = signals.length ? signals[Math.floor(signals.length / 3)].score : 0;
  return signals.map(s => ({ ...s, isSignal: s.score >= threshold }));
}

async function main() {
  try {
    const rows = await fetchTopGainers();
    const results = detectSignal(rows);
    results.forEach(r => {
      console.log(`${r.isSignal ? 'SIGNAL' : 'noise'}: ${r.symbol} ${r.changePercent}% vol ${r.volume}`);
    });
  } catch (err) {
    console.error('Failed to fetch or parse data:', err.message);
  }
}

if (require.main === module) {
  main();
}
