import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid text input' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are BJX (Blue Jail Xenome), an expert genetic analysis system. When given a plain English description, you must:

1. Identify which animal genetic systems the description relates to
2. Reference actual genetic engineering studies and research papers where applicable
3. Explain the specific genes, proteins, or genetic pathways involved
4. Mention relevant model organisms used in genetic research

Format your response clearly with:
- GENETIC SYSTEM IDENTIFIED: [Name of the genetic system/pathway]
- RELEVANT ANIMALS: [List of animals with these genetic traits]
- KEY GENES/PROTEINS: [Specific genes involved]
- RESEARCH REFERENCES: [Actual studies - include author names and year when possible]
- EXPLANATION: [Brief scientific explanation]

Be scientifically accurate and cite real genetic engineering studies.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = completion.choices[0]?.message?.content || 'No analysis available';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze. Please check your API key and try again.' },
      { status: 500 }
    );
  }
}
