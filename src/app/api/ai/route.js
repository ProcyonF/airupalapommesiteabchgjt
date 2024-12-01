import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 7a76edae7e2cef0d1e3042c9d0fd875b4e63a4a1f9f9a2e9c9215c4d9c8c1b0e",
        },
        body: JSON.stringify({
          model: "togethercomputer/llama-2-70b-chat",
          messages: messages,
          max_tokens: 1024,
          temperature: 0.7,
          top_p: 0.7,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch response');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
