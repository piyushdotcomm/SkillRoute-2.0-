import fetch from 'node-fetch';

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export async function callGemini(prompt) {
  const body = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    // Extract the text from the response
    return { text: data.candidates[0].content.parts[0].text };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export function extractJsonBlock(text) {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      console.error('Failed to parse JSON from block', e);
      return null;
    }
  }
  // Fallback for cases where the ```json is missing
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}
