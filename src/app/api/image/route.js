import { NextResponse } from 'next/server';

export async function POST(req) {
  const stability_api_key = process.env.STABILITY_API_KEY;
  
  console.log('Starting image generation request');
  
  if (!stability_api_key) {
    console.error('API key is missing');
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();
    console.log('Received prompt:', prompt);

    console.log('Sending request to Stability API');
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image",  // Changed to v1-6
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${stability_api_key}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height: 512,  // Reduced size
          width: 512,   // Reduced size
          steps: 30,
          samples: 1,
        }),
      }
    );

    console.log('Stability API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Stability API Error Response:', errorText);
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || 'Failed to generate image');
      } catch (e) {
        throw new Error(errorText || 'Failed to generate image');
      }
    }

    const result = await response.json();
    console.log('Successfully received image data');
    
    if (!result.artifacts || !result.artifacts[0]) {
      throw new Error('No image data in response');
    }

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${result.artifacts[0].base64}`,
    });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { error: `Error generating image: ${error.message}` },
      { status: 500 }
    );
  }
}
