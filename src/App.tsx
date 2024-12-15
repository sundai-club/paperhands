import { useEffect } from 'react';
import './App.css';
import { bingNewsTrends } from './utils/trendsUtils';

function App() {
  useEffect(() => {
    bingNewsTrends();
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App; 