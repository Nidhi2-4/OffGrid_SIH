import { NextRequest, NextResponse } from 'next/server';
import { generateAssistantAnswer, AssistantPersona, AssistantLanguage } from '@/lib/aiAssistantEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, persona = 'scientist', language = 'en' } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'A valid search query string is required' },
        { status: 400 }
      );
    }

    const response = await generateAssistantAnswer(
      query,
      persona as AssistantPersona,
      language as AssistantLanguage
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /api/assistant/query Error]:', error);
    return NextResponse.json(
      { error: 'Failed to process AI Assistant query' },
      { status: 500 }
    );
  }
}
