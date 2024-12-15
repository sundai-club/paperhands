import { useEffect } from 'react';
import './App.css';
import { bingNewsTrends } from './utils/trendsUtils';
import { mostPopularCoins } from './utils/coinUtils';

function App() {
  useEffect(() => {
    bingNewsTrends();
    mostPopularCoins();
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App; 