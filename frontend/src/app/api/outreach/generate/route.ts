import { NextRequest, NextResponse } from 'next/server';
import { synthesizeScienceNews, SynthesisRequest } from '@/lib/aiNewsSynthesizer';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SynthesisRequest;
    const { topicOrText, mode = 'frontpage', datasetId, knowledgeId } = body;

    if (!topicOrText && !datasetId && !knowledgeId) {
      return NextResponse.json(
        { error: 'Provide a topic, dataset ID, or knowledge ID to generate news' },
        { status: 400 }
      );
    }

    const result = await synthesizeScienceNews({
      topicOrText: topicOrText || 'Polar and Ocean Scientific Research',
      mode,
      datasetId,
      knowledgeId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API /api/outreach/generate Error]:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize science news article' },
      { status: 500 }
    );
  }
}
