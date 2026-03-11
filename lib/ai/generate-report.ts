/**
 * AI-Powered Vedic Astrology Report Generation
 *
 * Generates comprehensive astrology reports using AI models based on:
 * - Calculated birth chart data
 * - User tier (basic/premium)
 * - Report type (kundli/compatibility/career/daily)
 * - System prompts encoding Vedic astrology principles
 *
 * Supports multiple AI providers with fallback strategies and retry logic.
 */

import type { ChartData } from '../astrology/calculator';
import type { CompatibilityScore } from '../astrology/compatibility';
import { getPromptByReportType } from './prompts';

/**
 * Report sections that can be generated
 */
export interface ReportSection {
  title: string;
  content: string;
  subsections?: ReportSubsection[];
}

/**
 * Subsection of a report
 */
export interface ReportSubsection {
  title: string;
  content: string;
}

/**
 * Complete generated report
 */
export interface Report {
  id: string;
  type: 'kundli' | 'compatibility' | 'career' | 'daily-horoscope';
  title: string;
  sections: ReportSection[];
  summary: string;
  metadata: {
    generatedAt: Date;
    generationTimeMs: number;
    model: string;
    tier: 'basic' | 'premium';
    tokenCount?: number;
    cost?: number;
    status: 'success' | 'partial' | 'failed';
    error?: string;
  };
}

/**
 * Configuration for report generation
 */
export interface GenerationConfig {
  apiKey: string;
  apiEndpoint?: string;
  modelBasic?: string;
  modelPremium?: string;
  tier?: 'basic' | 'premium';
  maxRetries?: number;
  timeoutMs?: number;
}

/**
 * AI Report Generator class
 */
export class AstroReportGenerator {
  private apiKey: string;
  private apiEndpoint: string;
  private modelBasic: string;
  private modelPremium: string;
  private maxRetries: number;
  private timeoutMs: number;

  /**
   * Initialize the report generator with API configuration
   */
  constructor(config: GenerationConfig) {
    this.apiKey = config.apiKey;
    this.apiEndpoint = config.apiEndpoint || 'https://api.openai.com/v1/chat/completions';
    this.modelBasic = config.modelBasic || 'gpt-4-turbo';
    this.modelPremium = config.modelPremium || 'gpt-4-turbo';
    this.maxRetries = config.maxRetries || 3;
    this.timeoutMs = config.timeoutMs || 120000;
  }

  /**
   * Generate comprehensive Kundli (birth chart) report
   */
  async generateKundliReport(
    chartData: ChartData,
    tier: 'basic' | 'premium' = 'premium'
  ): Promise<Report> {
    const startTime = Date.now();

    try {
      const systemPrompt = getPromptByReportType('kundli');
      const userPrompt = this.buildKundliPrompt(chartData);

      const model = tier === 'premium' ? this.modelPremium : this.modelBasic;
      const response = await this.callAIModel(systemPrompt, userPrompt, model);

      const sections = this.parseReportSections(response.content, 'kundli');
      const summary = this.generateSummary(chartData);

      return {
        id: this.generateId(),
        type: 'kundli',
        title: `Vedic Birth Chart Report for ${chartData.location}`,
        sections,
        summary,
        metadata: {
          generatedAt: new Date(),
          generationTimeMs: Date.now() - startTime,
          model,
          tier,
          tokenCount: response.tokenCount,
          cost: this.calculateCost(response.tokenCount),
          status: 'success',
        },
      };
    } catch (error) {
      return this.handleGenerationError(error, startTime, 'kundli', tier);
    }
  }

  /**
   * Generate compatibility report for two people
   */
  async generateCompatibilityReport(
    chart1: ChartData,
    chart2: ChartData,
    compatibility: CompatibilityScore,
    name1: string,
    name2: string,
    tier: 'basic' | 'premium' = 'premium'
  ): Promise<Report> {
    const startTime = Date.now();

    try {
      const systemPrompt = getPromptByReportType('compatibility');
      const userPrompt = this.buildCompatibilityPrompt(
        chart1,
        chart2,
        compatibility,
        name1,
        name2
      );

      const model = tier === 'premium' ? this.modelPremium : this.modelBasic;
      const response = await this.callAIModel(systemPrompt, userPrompt, model);

      const sections = this.parseReportSections(response.content, 'compatibility');
      const summary = `Compatibility Score: ${compatibility.totalScore}/36 (${compatibility.compatibility})`;

      return {
        id: this.generateId(),
        type: 'compatibility',
        title: `Relationship Compatibility Report: ${name1} & ${name2}`,
        sections,
        summary,
        metadata: {
          generatedAt: new Date(),
          generationTimeMs: Date.now() - startTime,
          model,
          tier,
          tokenCount: response.tokenCount,
          cost: this.calculateCost(response.tokenCount),
          status: 'success',
        },
      };
    } catch (error) {
      return this.handleGenerationError(error, startTime, 'compatibility', tier);
    }
  }

  /**
   * Generate career guidance report
   */
  async generateCareerReport(
    chartData: ChartData,
    tier: 'basic' | 'premium' = 'premium'
  ): Promise<Report> {
    const startTime = Date.now();

    try {
      const systemPrompt = getPromptByReportType('career');
      const userPrompt = this.buildCareerPrompt(chartData);

      const model = tier === 'premium' ? this.modelPremium : this.modelBasic;
      const response = await this.callAIModel(systemPrompt, userPrompt, model);

      const sections = this.parseReportSections(response.content, 'career');
      const summary = this.generateCareerSummary(chartData);

      return {
        id: this.generateId(),
        type: 'career',
        title: `Career and Professional Guidance for ${chartData.location}`,
        sections,
        summary,
        metadata: {
          generatedAt: new Date(),
          generationTimeMs: Date.now() - startTime,
          model,
          tier,
          tokenCount: response.tokenCount,
          cost: this.calculateCost(response.tokenCount),
          status: 'success',
        },
      };
    } catch (error) {
      return this.handleGenerationError(error, startTime, 'career', tier);
    }
  }

  /**
   * Generate daily horoscopes for all 12 signs
   */
  async generateDailyHoroscope(
    date: Date,
    tier: 'basic' | 'premium' = 'basic'
  ): Promise<Report> {
    const startTime = Date.now();

    try {
      const systemPrompt = getPromptByReportType('daily-horoscope');
      const userPrompt = this.buildDailyHoroscopePrompt(date);

      const model = tier === 'premium' ? this.modelPremium : this.modelBasic;
      const response = await this.callAIModel(systemPrompt, userPrompt, model);

      const sections = this.parseDailyHoroscopes(response.content);
      const summary = `Daily Horoscope for ${date.toDateString()}`;

      return {
        id: this.generateId(),
        type: 'daily-horoscope',
        title: `Daily Horoscope - ${date.toDateString()}`,
        sections,
        summary,
        metadata: {
          generatedAt: new Date(),
          generationTimeMs: Date.now() - startTime,
          model,
          tier,
          tokenCount: response.tokenCount,
          cost: this.calculateCost(response.tokenCount),
          status: 'success',
        },
      };
    } catch (error) {
      return this.handleGenerationError(error, startTime, 'daily-horoscope', tier);
    }
  }

  /**
   * Build Kundli report prompt from chart data
   */
  private buildKundliPrompt(chartData: ChartData): string {
    return `
Please generate a comprehensive Vedic astrology birth chart (Kundli) report based on the following birth chart data:

## Birth Information
- Date: ${chartData.birthDate.toDateString()}
- Location: ${chartData.location}
- Latitude: ${chartData.latitude}
- Longitude: ${chartData.longitude}
- Timezone: UTC+${chartData.timezone}

## Ascendant (Lagna)
- Sign: ${chartData.ascendant.rashi}
- Degree: ${chartData.ascendant.rashiDegree.toFixed(2)}°
- Nakshatra: ${chartData.ascendant.nakshatra}
- Pada: ${chartData.ascendant.pada}

## Planetary Positions
${chartData.planets.map(p => `
- **${p.planet}**
  - Rashi: ${p.rashi}
  - Degree: ${p.rashiDegree.toFixed(2)}°
  - Nakshatra: ${p.nakshatra}
  - Pada: ${p.pada}
  - House: ${p.house}
  - Retrograde: ${p.isRetrograde ? 'Yes' : 'No'}
  - Speed: ${p.speed.toFixed(4)}°/day
`).join('')}

## House Cusps
${Object.entries(chartData.houseCusps).map(([house, lng]) =>
  `- House ${house}: ${lng.toFixed(2)}°`
).join('\n')}

## Identified Yogas
- Gajakesari: ${chartData.yogas.gajakesari ? 'Present' : 'Absent'}
- Budhaditya: ${chartData.yogas.budhaditya ? 'Present' : 'Absent'}
- Chandra-Mangal: ${chartData.yogas.chandraMangal ? 'Present' : 'Absent'}
- Amala: ${chartData.yogas.amalaYoga ? 'Present' : 'Absent'}
- Dhana: ${chartData.yogas.dhanaYoga ? 'Present' : 'Absent'}

## Identified Doshas
- Manglik Dosha: ${chartData.doshas.manglikDosha.exists ? `Yes (${chartData.doshas.manglikDosha.severity})` : 'Absent'}
- Kalsarpa Dosha: ${chartData.doshas.kalsarpaDosha.exists ? `Yes (${chartData.doshas.kalsarpaDosha.type})` : 'Absent'}
- Sadhesati: ${chartData.doshas.sadhesati.phase}

## Current Dasha
- Mahadasha: ${chartData.dasha.mahadasha.planet} (${chartData.dasha.mahadasha.duration} years)
- Antardasha: ${chartData.dasha.antardasha.planet}
- Years Remaining: ${chartData.dasha.mahadasha.yearsRemaining.toFixed(1)}

## Ayanamsa
- Lahiri Ayanamsa: ${chartData.ayanamsa.toFixed(3)}°
- Sidereal Time: ${chartData.siderealTime.toFixed(4)}°

Please generate a comprehensive, detailed, and deeply insightful Vedic astrology report based on this chart data. The report should be approximately 3,000-4,000 words and include all sections outlined in your system prompt.
`;
  }

  /**
   * Build compatibility report prompt
   */
  private buildCompatibilityPrompt(
    chart1: ChartData,
    chart2: ChartData,
    compatibility: CompatibilityScore,
    name1: string,
    name2: string
  ): string {
    return `
Please generate a comprehensive Vedic astrology compatibility report for the following couple:

## Person 1: ${name1}
Birth Chart: ${JSON.stringify({
      date: chart1.birthDate.toISOString(),
      location: chart1.location,
      ascendant: chart1.ascendant.rashi,
      moon: chart1.planets.find(p => p.planet === 'Moon')?.rashi,
      moonNakshatra: chart1.planets.find(p => p.planet === 'Moon')?.nakshatra,
    })}

## Person 2: ${name2}
Birth Chart: ${JSON.stringify({
      date: chart2.birthDate.toISOString(),
      location: chart2.location,
      ascendant: chart2.ascendant.rashi,
      moon: chart2.planets.find(p => p.planet === 'Moon')?.rashi,
      moonNakshatra: chart2.planets.find(p => p.planet === 'Moon')?.nakshatra,
    })}

## Compatibility Scores (Ashtakoota)
${compatibility.gunaScores.map(score =>
  `- ${score.guna}: ${score.earnedPoints}/${score.maxPoints} points (${score.percentage.toFixed(1)}%)`
).join('\n')}

**Total Score: ${compatibility.totalScore}/36 (${compatibility.percentage.toFixed(1)}%) - ${compatibility.compatibility}**

### Strengths:
${compatibility.strengthAreas.join('\n')}

### Challenges:
${compatibility.challengeAreas.join('\n')}

Please generate a comprehensive compatibility analysis report following your system prompt structure, addressing all key areas of compatibility and providing practical guidance for relationship success.
`;
  }

  /**
   * Build career report prompt
   */
  private buildCareerPrompt(chartData: ChartData): string {
    return `
Please generate a comprehensive career guidance report based on the following birth chart:

## Birth Information
- Location: ${chartData.location}
- Date: ${chartData.birthDate.toDateString()}

## Relevant Chart Positions
- Ascendant: ${chartData.ascendant.rashi}
- 10th House Cusp (Career): ${chartData.houseCusps[10]?.toFixed(2) || 'N/A'}
- Sun Position: House ${chartData.planets.find(p => p.planet === 'Sun')?.house}
- Mercury Position: House ${chartData.planets.find(p => p.planet === 'Mercury')?.house}
- Jupiter Position: House ${chartData.planets.find(p => p.planet === 'Jupiter')?.house}
- Saturn Position: House ${chartData.planets.find(p => p.planet === 'Saturn')?.house}

Please generate a detailed career guidance report including suitable professions, timing for career changes, financial potential, and remedies for professional success.
`;
  }

  /**
   * Build daily horoscope prompt
   */
  private buildDailyHoroscopePrompt(date: Date): string {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
Please generate daily horoscopes for all 12 zodiac signs for ${dayName}, ${dateStr}.

For each sign, provide:
1. Overall Energy/Theme (1-2 sentences)
2. General Day Forecast (50-75 words)
3. Love and Relationships (30-50 words)
4. Career and Finance (30-50 words)
5. Health and Wellbeing (20-30 words)
6. Lucky Elements:
   - Lucky Number (1-9)
   - Lucky Color
   - Lucky Time
   - Lucky Direction
   - Power Mantra or Affirmation

Generate horoscopes for all 12 signs in the order: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.
`;
  }

  /**
   * Call AI model with retry logic and fallback
   */
  private async callAIModel(
    systemPrompt: string,
    userPrompt: string,
    model: string
  ): Promise<{ content: string; tokenCount: number }> {
    let lastError: any;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.makeAPICall(systemPrompt, userPrompt, model);
        return response;
      } catch (error) {
        lastError = error;
        console.error(`API call attempt ${attempt}/${this.maxRetries} failed:`, error);

        if (attempt < this.maxRetries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(`Failed to generate report after ${this.maxRetries} attempts. Last error: ${lastError}`);
  }

  /**
   * Make API call to the configured endpoint
   */
  private async makeAPICall(
    systemPrompt: string,
    userPrompt: string,
    model: string
  ): Promise<{ content: string; tokenCount: number }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      return {
        content: data.choices[0].message.content,
        tokenCount: data.usage?.total_tokens || 0,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Parse report sections from AI response
   */
  private parseReportSections(content: string, reportType: string): ReportSection[] {
    // Simple heading-based parsing
    // In production, use more sophisticated parsing
    const sections: ReportSection[] = [];

    const headingPattern = /#{1,2}\s+(.+)/g;
    let lastIndex = 0;
    let match;

    while ((match = headingPattern.exec(content)) !== null) {
      const title = match[1].trim();
      const contentStart = match.index + match[0].length;
      const nextMatch = headingPattern.exec(content);
      const contentEnd = nextMatch ? nextMatch.index : content.length;

      const sectionContent = content.substring(contentStart, contentEnd).trim();

      sections.push({
        title,
        content: sectionContent,
      });

      // Reset regex for next iteration
      if (!nextMatch) break;
      lastIndex = nextMatch.index;
    }

    // If no sections found, return whole content as single section
    if (sections.length === 0) {
      sections.push({
        title: 'Report',
        content: content,
      });
    }

    return sections;
  }

  /**
   * Parse daily horoscopes for 12 signs
   */
  private parseDailyHoroscopes(content: string): ReportSection[] {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

    const sections: ReportSection[] = [];

    for (const sign of signs) {
      const regex = new RegExp(`## ${sign}[\\s\\S]*?(?=##|$)`, 'i');
      const match = content.match(regex);

      if (match) {
        sections.push({
          title: sign,
          content: match[0].replace(`## ${sign}`, '').trim(),
        });
      }
    }

    return sections;
  }

  /**
   * Generate summary from chart data
   */
  private generateSummary(chartData: ChartData): string {
    const sun = chartData.planets.find(p => p.planet === 'Sun');
    const moon = chartData.planets.find(p => p.planet === 'Moon');

    return `Birth Chart Summary: ${chartData.ascendant.rashi} Ascendant with ${sun?.rashi || 'Unknown'} Sun and ${moon?.rashi || 'Unknown'} Moon. ${chartData.dasha.mahadasha.planet} Mahadasha currently active.`;
  }

  /**
   * Generate career summary
   */
  private generateCareerSummary(chartData: ChartData): string {
    const sun = chartData.planets.find(p => p.planet === 'Sun');
    return `Career analysis based on ${chartData.ascendant.rashi} Ascendant and ${sun?.house || '10th'} house ${sun?.rashi} Sun.`;
  }

  /**
   * Calculate cost based on token usage
   */
  private calculateCost(tokenCount?: number): number {
    if (!tokenCount) return 0;

    // OpenAI pricing (example rates)
    // 4o: $0.15 per 1M input, $0.60 per 1M output
    // Using average of 0.0003 per token for estimation
    return (tokenCount * 0.0003) || 0;
  }

  /**
   * Generate unique report ID
   */
  private generateId(): string {
    return `report_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * Handle generation errors gracefully
   */
  private handleGenerationError(
    error: any,
    startTime: number,
    reportType: string,
    tier: string
  ): Report {
    console.error('Report generation error:', error);

    return {
      id: this.generateId(),
      type: reportType as any,
      title: `Report Generation Failed`,
      sections: [
        {
          title: 'Error',
          content: 'The report generation encountered an error. Please try again later or contact support.',
        },
      ],
      summary: 'Report generation failed',
      metadata: {
        generatedAt: new Date(),
        generationTimeMs: Date.now() - startTime,
        model: 'unknown',
        tier: tier as any,
        status: 'failed',
        error: error?.message || 'Unknown error occurred',
      },
    };
  }
}

/**
 * Factory function to create report generator with default configuration
 */
export function createReportGenerator(apiKey: string): AstroReportGenerator {
  return new AstroReportGenerator({
    apiKey,
    apiEndpoint: process.env.AI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
    modelBasic: process.env.AI_MODEL_BASIC || 'gpt-4-turbo',
    modelPremium: process.env.AI_MODEL_PREMIUM || 'gpt-4-turbo',
  });
}
