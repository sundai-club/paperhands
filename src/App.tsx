import { useEffect, useState } from 'react';
import './App.css';
import { bingNewsTrends } from './utils/trendsUtils';
import { mostPopularCoins } from './utils/coinUtils';
import { getCoinRecommendation } from './utils/gptUtils';

const listLength = 30;

function App() {
  const [trends, setTrends] = useState<any[]>([]);
  const [coins, setCoins] = useState<any[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'market_cap_desc' | 'volume_desc'>('market_cap_desc');
  const [gptRecommendation, setGptRecommendation] = useState<string>('');
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);

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
      const coinsData = await mostPopularCoins(sortBy);
      const limitedTrends = trendsData.value.slice(0, listLength);
      const limitedCoins = coinsData.slice(0, listLength);
      setTrends(limitedTrends);
      setCoins(limitedCoins);
      const matchingWords = findMatches(limitedTrends, limitedCoins);
      setMatches(matchingWords);

      // If no matches, get GPT recommendation
      if (matchingWords.length === 0) {
        setIsLoadingRecommendation(true);
        const trendsNames = limitedTrends.map((trend: any) => trend.name);
        const coinNames = limitedCoins.map((coin: any) => coin.name);
        const recommendation = await getCoinRecommendation(coinNames, trendsNames);
        setGptRecommendation(recommendation);
        setIsLoadingRecommendation(false);
      }
    };
    
    fetchData();
  }, [sortBy]);

  return (
    <div className="App">
      <div className="pepe-container">
        <img src={process.env.PUBLIC_URL + '/pepe.png'} alt="pepe" />
      </div>
      <div className="matches-header">
        {matches.length > 0 ? (
          <h1 className="no-matches">Found matching words: {matches.join(', ')}</h1>
        ) : (
          <div>
            <h1>No coins match a trending topic 😩</h1>
            {isLoadingRecommendation ? (
              <p className="gpt-loading">Getting AI recommendation... 🤖</p>
            ) : (
              <p className="gpt-recommendation">{gptRecommendation}</p>
            )}
          </div>
        )}
      </div>
      <div className="columns-container">
        <div className="column">
          <h2 style={{marginTop: '40px', marginBottom: '70px'}}>Trending Topics</h2>
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
            <div className="sort-toggle">
                <label className="switch">
                <input
                    type="checkbox"
                    checked={sortBy === 'volume_desc'}
                    onChange={() => setSortBy(prev => 
                    prev === 'market_cap_desc' ? 'volume_desc' : 'market_cap_desc'
                    )}
                />
                <span className="slider">
                    <span className="slider-text market-cap">Market Cap</span>
                    <span className="slider-text volume">Volume</span>
                </span>
                </label>
            </div>
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