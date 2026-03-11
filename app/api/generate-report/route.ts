import { NextRequest, NextResponse } from 'next/server';
import { generateAstroReport } from '@/lib/ai/openrouter';
import { getPromptByReportType } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chartData, reportType = 'kundli', tier = 'basic' } = body;

    if (!chartData) {
      return NextResponse.json({ error: 'Chart data is required' }, { status: 400 });
    }

    const systemPrompt = getPromptByReportType(reportType);
    const userPrompt = buildReportPrompt(chartData, reportType);

    let aiResponse;
    try {
      aiResponse = await generateAstroReport(systemPrompt, userPrompt, tier);
    } catch (aiError: any) {
      console.error('AI generation failed:', aiError.message);
      // Return a fallback report using chart data
      return NextResponse.json({
        success: true,
        report: generateFallbackReport(chartData, reportType),
      });
    }

    const sections = parseReportSections(aiResponse.content);
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      report: {
        id: reportId,
        type: reportType,
        title: getReportTitle(chartData, reportType),
        sections,
        summary: generateSummary(chartData),
        generatedAt: new Date().toISOString(),
        model: aiResponse.model,
        tier,
      },
    });
  } catch (error: any) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report', details: error.message },
      { status: 500 }
    );
  }
}

function buildReportPrompt(chartData: any, reportType: string): string {
  const planets = chartData.planets || [];
  const planetInfo = planets.map((p: any) =>
    `- ${p.planet}: ${p.rashi} (${p.rashiDegree?.toFixed(1)}°), House ${p.house}, Nakshatra: ${p.nakshatra}, Pada: ${p.pada}${p.isRetrograde ? ' (R)' : ''}`
  ).join('\n');

  return `Generate a comprehensive ${reportType} report based on this Vedic birth chart:

## Birth Details
- Location: ${chartData.location || chartData.placeOfBirth || 'Unknown'}
- Date: ${chartData.birthDate || 'Unknown'}
- Time: ${chartData.timeOfBirth || 'Unknown'}

## Ascendant (Lagna)
- Sign: ${chartData.ascendant?.rashi || 'Unknown'}
- Degree: ${chartData.ascendant?.rashiDegree?.toFixed(2) || 0}°
- Nakshatra: ${chartData.ascendant?.nakshatra || 'Unknown'}

## Planetary Positions
${planetInfo}

## Yogas
- Gajakesari: ${chartData.yogas?.gajakesari ? 'Present' : 'Absent'}
- Budhaditya: ${chartData.yogas?.budhaditya ? 'Present' : 'Absent'}
- Chandra-Mangal: ${chartData.yogas?.chandraMangal ? 'Present' : 'Absent'}
- Amala: ${chartData.yogas?.amalaYoga ? 'Present' : 'Absent'}
- Dhana: ${chartData.yogas?.dhanaYoga ? 'Present' : 'Absent'}

## Doshas
- Manglik: ${chartData.doshas?.manglikDosha?.exists ? chartData.doshas.manglikDosha.severity : 'Absent'}
- Kalsarpa: ${chartData.doshas?.kalsarpaDosha?.exists ? chartData.doshas.kalsarpaDosha.type : 'Absent'}
- Sadhesati: ${chartData.doshas?.sadhesati?.phase || 'none'}

## Current Dasha
- Mahadasha: ${chartData.dasha?.mahadasha?.planet || 'Unknown'} (${chartData.dasha?.mahadasha?.duration || 0} years)
- Antardasha: ${chartData.dasha?.antardasha?.planet || 'Unknown'}

Generate a detailed, insightful report with all sections. Use proper Vedic terminology.`;
}

function parseReportSections(content: string): Array<{ title: string; content: string }> {
  const sections: Array<{ title: string; content: string }> = [];
  const parts = content.split(/^#{1,3}\s+/m).filter(Boolean);

  for (const part of parts) {
    const lines = part.trim().split('\n');
    const title = lines[0].replace(/[#*]/g, '').trim();
    const sectionContent = lines.slice(1).join('\n').trim();
    if (title && sectionContent) {
      sections.push({ title, content: sectionContent });
    }
  }

  if (sections.length === 0) {
    sections.push({ title: 'Vedic Astrology Report', content });
  }

  return sections;
}

function getReportTitle(chartData: any, reportType: string): string {
  const name = chartData.name || 'Your';
  switch (reportType) {
    case 'kundli': return `${name}'s Vedic Birth Chart (Kundli) Report`;
    case 'career': return `${name}'s Career & Professional Guidance`;
    case 'compatibility': return 'Relationship Compatibility Report';
    default: return `${name}'s Vedic Astrology Report`;
  }
}

function generateSummary(chartData: any): string {
  const asc = chartData.ascendant?.rashi || 'Unknown';
  const sun = chartData.planets?.find((p: any) => p.planet === 'Sun');
  const moon = chartData.planets?.find((p: any) => p.planet === 'Moon');
  const dasha = chartData.dasha?.mahadasha?.planet || 'Unknown';
  return `${asc} Ascendant with ${sun?.rashi || 'Unknown'} Sun and ${moon?.rashi || 'Unknown'} Moon. Currently in ${dasha} Mahadasha.`;
}

function generateFallbackReport(chartData: any, reportType: string): any {
  const asc = chartData.ascendant?.rashi || 'Aries';
  const moon = chartData.planets?.find((p: any) => p.planet === 'Moon');
  const sun = chartData.planets?.find((p: any) => p.planet === 'Sun');

  return {
    id: `report_${Date.now()}`,
    type: reportType,
    title: getReportTitle(chartData, reportType),
    sections: [
      {
        title: 'Chart Overview',
        content: `Your birth chart reveals a ${asc} Ascendant (Lagna), which shapes your personality and life path. With ${sun?.rashi || 'your Sun sign'} Sun and ${moon?.rashi || 'your Moon sign'} Moon, you possess a unique blend of qualities that influence your journey through life.\n\nThe Ascendant in ${asc} gives you distinctive characteristics that color how the world perceives you and how you approach life's challenges.`,
      },
      {
        title: 'Personality Analysis',
        content: `As a ${asc} Ascendant native, your personality reflects the core qualities of this sign. Your ${moon?.rashi || 'Moon'} Moon adds emotional depth and intuitive understanding to your character.\n\nYour Sun in ${sun?.rashi || 'its sign'} in the ${sun?.house || 'relevant'}th house indicates your core identity and life purpose.`,
      },
      {
        title: 'Career & Professional Life',
        content: `The planetary positions in your chart suggest natural inclinations toward specific career paths. Your 10th house configuration, combined with the placement of Saturn and Jupiter, indicates the nature of your professional journey.\n\nThe current Dasha period of ${chartData.dasha?.mahadasha?.planet || 'the ruling planet'} influences your career trajectory.`,
      },
      {
        title: 'Relationships & Marriage',
        content: `Your 7th house analysis reveals important insights about your partnerships and marriage prospects. The placement of Venus and the 7th house lord in your chart shapes your approach to relationships.\n\n${chartData.doshas?.manglikDosha?.exists ? 'Note: Manglik Dosha is present in your chart. Appropriate remedies are recommended.' : 'Your chart shows favorable indications for harmonious relationships.'}`,
      },
      {
        title: 'Current Dasha Period',
        content: `You are currently in the ${chartData.dasha?.mahadasha?.planet || 'planetary'} Mahadasha with ${chartData.dasha?.antardasha?.planet || 'sub-period'} Antardasha. This period brings specific themes and energies to your life that influence major decisions and life events.`,
      },
      {
        title: 'Remedial Measures',
        content: `Based on your chart analysis, the following remedies are recommended:\n\n- Regular meditation and spiritual practices suited to your planetary configuration\n- Wearing gemstones appropriate for strengthening beneficial planets\n- Charitable activities on specific days aligned with your chart\n- Mantras for planetary propitiation\n\nRemember: Astrology reveals tendencies, not certainties. Your free will and conscious choices shape your destiny.`,
      },
    ],
    summary: generateSummary(chartData),
    generatedAt: new Date().toISOString(),
    model: 'fallback',
    tier: 'basic',
  };
}
