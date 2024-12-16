const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getCoinRecommendation = async (coins: string[], trends: string[]) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "Keep your responses short, and ONLY speak in gen z slang"
        }, {
          role: "user",
          content: `Recommend a cryptocurrency from this list """${coins.join(', ')}""" based EXCLUSIVELY on these trending topics: """${trends.join(', ')}""". Explain why in one sentence, referencing the specific trending topic the coin relates to. Do not recommend any popular cryptocurrencies.`        }],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('GPT API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting GPT recommendation:', error);
    return "Sorry, couldn't get a recommendation right now! 🤔";
  }
}; 