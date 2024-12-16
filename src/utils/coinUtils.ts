const coingeckoEndpoint = 'https://api.coingecko.com/api/v3/coins/markets';

// Get CoinGecko API key from environment variables
const coingeckoAPIKey = process.env.REACT_APP_COINGECKO_API_KEY;

// Fetch most popular coins from CoinGecko API
export const mostPopularCoins = async (sortBy: 'market_cap_desc' | 'volume_desc' = 'market_cap_desc') => {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: sortBy,
  });

  try {
    const response = await fetch(`${coingeckoEndpoint}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const coins = await response.json();
    return(coins);
  } catch (error) {
    console.error('Error fetching coins:', error);
  }
};
