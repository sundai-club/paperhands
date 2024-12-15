const bingEndpoint = 'https://api.bing.microsoft.com/v7.0/news/trendingtopics';

// Get Bing API key from environment variables
const bingAPIKey = process.env.REACT_APP_BING_API_KEY;

// Fetch trending topics from Bing News API
export async function bingNewsTrends() {
  if (!bingAPIKey) {
    throw new Error('BING_API_KEY is not defined in environment variables');
  }
  const headers = {
    'Ocp-Apim-Subscription-Key': bingAPIKey
  };
  try {
    const response = await fetch(bingEndpoint, { method: 'GET', headers: headers });
    if (response.ok) {
      const trends = await response.json();
      return(trends);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
}
