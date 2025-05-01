// import OpenAI from 'openai';

// export const runtime = 'edge'; // for edge functions (optional)

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: Request) {
//   const prompt =
//     "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me...";

//   const stream = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages: [
//       {
//         role: 'user',
//         content: prompt,
//       },
//     ],
//   });

//   const encoder = new TextEncoder();
//   const readable = new ReadableStream({
//     async start(controller) {
//       for await (const chunk of stream) {
//         const content = chunk.choices[0]?.delta?.content || '';
//         controller.enqueue(encoder.encode(content));
//       }
//       controller.close();
//     },
//   });

//   return new Response(readable, {
//     headers: {
//       'Content-Type': 'text/plain; charset=utf-8',
//     },
//   });
// }



// app/api/suggest-messages/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

       const prompt = `
      Generate a list of 5 diverse and engaging anonymous messages that can be sent to someone. The messages should vary in tone, including friendly, cheeky, funny, motivational, and thoughtful. Each message should be short, kind, and fun. The messages should aim to make the recipient smile, feel encouraged, or even laugh. 
      Format the suggestions as a list, with each suggestion separated by '||'.`

    const result = await model.generateContent(prompt)
    const suggestionText = result.response.text().trim()

    // Split the text into an array using '||' as a delimiter
    const suggestions = suggestionText.split('||').map((message) => message.trim())

    return NextResponse.json({
      success: true,
      suggestions, // Return the suggestions as an array
    })
  } catch (error) {
    console.error('Error generating suggestion:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to generate message suggestion.' },
      { status: 500 }
    )
  }
}
