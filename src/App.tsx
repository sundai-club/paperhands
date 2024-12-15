import { useEffect, useState } from 'react';
import './App.css';
import { bingNewsTrends } from './utils/trendsUtils';
import { mostPopularCoins } from './utils/coinUtils';

function App() {
  const [trends, setTrends] = useState<any[]>([]);
  const [coins, setCoins] = useState<any[]>([]);
  const [matches, setMatches] = useState<string[]>([]);

  const findMatches = (trends: any[], coins: any[]) => {
    const trendWords = trends
      .map(trend => trend.name.toLowerCase().split(' '))
      .flat();
    const coinWords = coins
      .map(coin => coin.name.toLowerCase().split(' '))
      .flat();
    
    const matchingWords = trendWords.filter(word => 
      word.length > 2 && coinWords.includes(word)
    );
    
    // @ts-ignore
    return [...new Set(matchingWords)]; // Remove duplicates
  };

  useEffect(() => {
    const fetchData = async () => {
      const trendsData = await bingNewsTrends();
      const coinsData = await mostPopularCoins();
      const limitedTrends = trendsData.value.slice(0, 25);
      const limitedCoins = coinsData.slice(0, 25);
      setTrends(limitedTrends);
      setCoins(limitedCoins);
      setMatches(findMatches(limitedTrends, limitedCoins));
    };
    
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="matches-header">
        {matches.length > 0 ? (
          <h1>Found matching words: {matches.join(', ')}</h1>
        ) : (
          <h1>No coins match a trending topic</h1>
        )}
      </div>
      <div className="columns-container">
        <div className="column">
          <h2>Trending Topics</h2>
          <ul className="list-container">
            {trends.map((trend, index) => (
              <li key={`trend-${index}`} className="list-item">
                {trend.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Popular Coins</h2>
          <ul className="list-container">
            {coins.map((coin, index) => (
              <li key={`coin-${index}`} className="list-item">
                {coin.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App; 