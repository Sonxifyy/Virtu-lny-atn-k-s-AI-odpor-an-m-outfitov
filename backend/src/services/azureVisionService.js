import fetch from 'node-fetch';

export async function analyzeImageWithAzure(imageUrl) {
  const endpoint = process.env.AZURE_VISION_ENDPOINT;
  const apiKey = process.env.AZURE_VISION_KEY;

  if (!endpoint || !apiKey || !imageUrl) {
    return [];
  }

  const cleanEndpoint = endpoint.endsWith('/')
    ? endpoint.slice(0, -1)
    : endpoint;

  const response = await fetch(
    `${cleanEndpoint}/vision/v3.2/analyze?visualFeatures=Tags`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify({
        url: imageUrl
      })
    }
  );

  if (!response.ok) {
    throw new Error('Azure Vision request failed');
  }

  const data = await response.json();

  return (data.tags || []).map((tag) => tag.name.toLowerCase());
}