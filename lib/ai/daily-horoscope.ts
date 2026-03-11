/**
 * Daily Horoscope Generator for Vedic Astrology
 *
 * Generates daily astrological predictions for all 12 zodiac signs
 * based on current planetary transits and cosmic influences.
 */

import { AstroReportGenerator } from './generate-report';

/**
 * Horoscope for a single zodiac sign
 */
export interface SignHoroscope {
  sign: string;
  date: Date;
  generalForecast: string;
  loveAndRelationships: string;
  careerAndFinance: string;
  healthAndWellbeing: string;
  luckyElements: {
    number: number;
    color: string;
    time: string;
    direction: string;
    mantra: string;
  };
}

/**
 * Complete daily horoscope for all signs
 */
export interface DailyHoroscope {
  date: Date;
  horoscopes: SignHoroscope[];
  generalTheme: string;
  significantPlanets: string[];
}

/**
 * Daily Horoscope Generator
 */
export class DailyHoroscopeGenerator {
  private reportGenerator: AstroReportGenerator;

  /**
   * Initialize the daily horoscope generator
   */
  constructor(reportGenerator: AstroReportGenerator) {
    this.reportGenerator = reportGenerator;
  }

  /**
   * Generate daily horoscopes for all 12 zodiac signs
   *
   * @param date Date for which to generate horoscopes
   * @param tier User tier ('basic' or 'premium')
   * @returns Complete daily horoscope with predictions for all signs
   */
  public async generateDailyHoroscopes(
    date: Date = new Date(),
    tier: 'basic' | 'premium' = 'basic'
  ): Promise<DailyHoroscope> {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

    // Generate full report using AI
    const report = await this.reportGenerator.generateDailyHoroscope(date, tier);

    // Parse the report sections to extract individual sign horoscopes
    const horoscopes = this.parseHoroscopesFromReport(report.sections, signs);

    // Extract general theme and significant planets from the date
    const { theme, planets } = this.analyzeCosmicInfluences(date);

    return {
      date,
      horoscopes,
      generalTheme: theme,
      significantPlanets: planets,
    };
  }

  /**
   * Generate horoscope for a specific zodiac sign
   *
   * @param sign Zodiac sign (e.g., 'Aries')
   * @param date Date for the horoscope
   * @returns Horoscope for the specified sign
   */
  public async generateSignHoroscope(
    sign: string,
    date: Date = new Date()
  ): Promise<SignHoroscope> {
    const signNormalized = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();

    // Generate horoscope data (in production, this would be from the AI report)
    return {
      sign: signNormalized,
      date,
      generalForecast: `${signNormalized} natives will experience a favorable day with positive planetary influences supporting their endeavors.`,
      loveAndRelationships: 'Venus influences suggest harmony in relationships. A good time for heart-to-heart conversations with loved ones.',
      careerAndFinance: 'Mercury\'s transit favors communication and business dealings. Financial decisions should be made after careful consideration.',
      healthAndWellbeing: 'Mars suggests maintaining physical activity. Mental health benefits from meditation and mindfulness practices.',
      luckyElements: {
        number: this.getLuckyNumber(signNormalized),
        color: this.getLuckyColor(signNormalized),
        time: this.getLuckyTime(signNormalized),
        direction: this.getLuckyDirection(signNormalized),
        mantra: this.getMantra(signNormalized),
      },
    };
  }

  /**
   * Batch generate horoscopes for multiple signs
   *
   * @param signs Array of zodiac signs
   * @param date Date for the horoscopes
   * @returns Array of horoscopes for specified signs
   */
  public async generateBatchHoroscopes(
    signs: string[],
    date: Date = new Date()
  ): Promise<SignHoroscope[]> {
    const horoscopes: SignHoroscope[] = [];

    // Process in parallel with rate limiting
    const batchSize = 3;
    for (let i = 0; i < signs.length; i += batchSize) {
      const batch = signs.slice(i, i + batchSize);
      const batchPromises = batch.map(sign => this.generateSignHoroscope(sign, date));
      const batchResults = await Promise.all(batchPromises);
      horoscopes.push(...batchResults);

      // Rate limiting delay
      if (i + batchSize < signs.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return horoscopes;
  }

  /**
   * Parse horoscopes from AI-generated report sections
   */
  private parseHoroscopesFromReport(
    sections: any[],
    signs: string[]
  ): SignHoroscope[] {
    const horoscopes: SignHoroscope[] = [];

    for (const sign of signs) {
      // Find the section for this sign
      const section = sections.find(s => s.title?.toLowerCase() === sign.toLowerCase());

      if (section) {
        // Parse the content to extract horoscope elements
        const horoscope = this.parseSignSection(section.content, sign);
        horoscopes.push(horoscope);
      }
    }

    return horoscopes;
  }

  /**
   * Parse a single sign's horoscope section
   */
  private parseSignSection(content: string, sign: string): SignHoroscope {
    // Extract different subsections using regex
    const generalMatch = content.match(/(?:overall|general).*?:(.*?)(?=love|career|health|lucky|$)/is);
    const loveMatch = content.match(/love.*?:(.*?)(?=career|health|lucky|$)/is);
    const careerMatch = content.match(/career.*?:(.*?)(?=health|lucky|$)/is);
    const healthMatch = content.match(/health.*?:(.*?)(?=lucky|$)/is);
    const luckyMatch = content.match(/lucky.*?:([\s\S]*?)$/i);

    return {
      sign,
      date: new Date(),
      generalForecast: this.cleanText(generalMatch?.[1] || content.substring(0, 150)),
      loveAndRelationships: this.cleanText(loveMatch?.[1] || 'Venus influences suggest harmony in relationships.'),
      careerAndFinance: this.cleanText(careerMatch?.[1] || 'Mercury favors communication in professional matters.'),
      healthAndWellbeing: this.cleanText(healthMatch?.[1] || 'Maintain physical activity and mindfulness.'),
      luckyElements: this.parseLuckyElements(luckyMatch?.[1] || '', sign),
    };
  }

  /**
   * Parse lucky elements from horoscope text
   */
  private parseLuckyElements(text: string, sign: string): SignHoroscope['luckyElements'] {
    return {
      number: this.extractNumber(text) || this.getLuckyNumber(sign),
      color: this.extractColor(text) || this.getLuckyColor(sign),
      time: this.extractTime(text) || this.getLuckyTime(sign),
      direction: this.extractDirection(text) || this.getLuckyDirection(sign),
      mantra: this.extractMantra(text) || this.getMantra(sign),
    };
  }

  /**
   * Extract number from text
   */
  private extractNumber(text: string): number | null {
    const match = text.match(/(?:number|lucky|auspicious|favorable)[^0-9]*([0-9])/i);
    const num = match ? parseInt(match[1]) : null;
    return (num && num >= 0 && num <= 9) ? num : null;
  }

  /**
   * Extract color from text
   */
  private extractColor(text: string): string | null {
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Black', 'Purple', 'Orange', 'Pink', 'Gold', 'Silver'];
    for (const color of colors) {
      if (text.toLowerCase().includes(color.toLowerCase())) {
        return color;
      }
    }
    return null;
  }

  /**
   * Extract time from text
   */
  private extractTime(text: string): string | null {
    const match = text.match(/(?:time|hour)[^0-9]*([0-9]{1,2}):?([0-9]{2})?\s*(?:am|pm|AM|PM)/i);
    return match ? match[0] : null;
  }

  /**
   * Extract direction from text
   */
  private extractDirection(text: string): string | null {
    const directions = ['North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest'];
    for (const dir of directions) {
      if (text.toLowerCase().includes(dir.toLowerCase())) {
        return dir;
      }
    }
    return null;
  }

  /**
   * Extract mantra from text
   */
  private extractMantra(text: string): string | null {
    const match = text.match(/(?:mantra|chant|recite)[^a-zA-Z]*(.{20,100}?)(?:\.|$)/i);
    return match ? match[1].trim() : null;
  }

  /**
   * Clean extracted text
   */
  private cleanText(text: string): string {
    return text
      .trim()
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .substring(0, 300);
  }

  /**
   * Get lucky number for zodiac sign
   */
  private getLuckyNumber(sign: string): number {
    const numbers: Record<string, number> = {
      'Aries': 9, 'Taurus': 6, 'Gemini': 5, 'Cancer': 2,
      'Leo': 1, 'Virgo': 5, 'Libra': 6, 'Scorpio': 4,
      'Sagittarius': 3, 'Capricorn': 8, 'Aquarius': 7, 'Pisces': 3,
    };
    return numbers[sign] || Math.floor(Math.random() * 9) + 1;
  }

  /**
   * Get lucky color for zodiac sign
   */
  private getLuckyColor(sign: string): string {
    const colors: Record<string, string> = {
      'Aries': 'Red', 'Taurus': 'Green', 'Gemini': 'Yellow', 'Cancer': 'White',
      'Leo': 'Gold', 'Virgo': 'Green', 'Libra': 'Blue', 'Scorpio': 'Red',
      'Sagittarius': 'Yellow', 'Capricorn': 'Black', 'Aquarius': 'Blue', 'Pisces': 'Purple',
    };
    return colors[sign] || 'White';
  }

  /**
   * Get lucky time for zodiac sign
   */
  private getLuckyTime(sign: string): string {
    const times: Record<string, string> = {
      'Aries': '6:00 AM - 8:00 AM', 'Taurus': '4:00 PM - 6:00 PM', 'Gemini': '5:00 AM - 7:00 AM', 'Cancer': '5:00 PM - 7:00 PM',
      'Leo': '10:00 AM - 12:00 PM', 'Virgo': '4:00 AM - 6:00 AM', 'Libra': '9:00 AM - 11:00 AM', 'Scorpio': '6:00 PM - 8:00 PM',
      'Sagittarius': '11:00 AM - 1:00 PM', 'Capricorn': '1:00 PM - 3:00 PM', 'Aquarius': '3:00 PM - 5:00 PM', 'Pisces': '12:00 PM - 2:00 PM',
    };
    return times[sign] || '9:00 AM - 5:00 PM';
  }

  /**
   * Get lucky direction for zodiac sign
   */
  private getLuckyDirection(sign: string): string {
    const directions: Record<string, string> = {
      'Aries': 'South', 'Taurus': 'Southeast', 'Gemini': 'North', 'Cancer': 'Northwest',
      'Leo': 'East', 'Virgo': 'West', 'Libra': 'South', 'Scorpio': 'North',
      'Sagittarius': 'East', 'Capricorn': 'West', 'Aquarius': 'Northwest', 'Pisces': 'Southwest',
    };
    return directions[sign] || 'East';
  }

  /**
   * Get mantra for zodiac sign
   */
  private getMantra(sign: string): string {
    const mantras: Record<string, string> = {
      'Aries': 'Om Bhram Bhreem Bhroum Sah Bhaumaya Namah',
      'Taurus': 'Om Draam Dreem Droum Sah Shukraya Namah',
      'Gemini': 'Om Bram Breem Broum Sah Budhaya Namah',
      'Cancer': 'Om Shram Shreem Shroum Sah Chandramase Namah',
      'Leo': 'Om Hram Hreem Hroum Sah Suryaya Namah',
      'Virgo': 'Om Bram Breem Broum Sah Budhaya Namah',
      'Libra': 'Om Draam Dreem Droum Sah Shukraya Namah',
      'Scorpio': 'Om Bhram Bhreem Bhroum Sah Bhaumaya Namah',
      'Sagittarius': 'Om Gram Greem Groum Sah Gurave Namah',
      'Capricorn': 'Om Sham Shanicharaya Namah',
      'Aquarius': 'Om Sham Shanicharaya Namah',
      'Pisces': 'Om Gram Greem Groum Sah Gurave Namah',
    };
    return mantras[sign] || 'Om Namah Shivaya';
  }

  /**
   * Analyze cosmic influences for a given date
   */
  private analyzeCosmicInfluences(date: Date): { theme: string; planets: string[] } {
    const day = date.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayRulers = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

    const themes: Record<string, string> = {
      'Sunday': 'A day of solar influence bringing warmth, energy, and leadership qualities.',
      'Monday': 'Lunar energies dominate, favoring emotional depth and intuition.',
      'Tuesday': 'Martial energy creates action-oriented and courageous vibes.',
      'Wednesday': 'Mercury\'s influence brings communication and intellectual stimulation.',
      'Thursday': 'Jovian blessings bring expansion, wisdom, and prosperity.',
      'Friday': 'Venusian grace creates harmony, beauty, and relationship focus.',
      'Saturday': 'Saturnian discipline and responsibility set the tone.',
    };

    return {
      theme: themes[dayNames[day]] || 'A balanced day with mixed cosmic influences.',
      planets: [dayRulers[day]],
    };
  }
}

/**
 * Factory function to create daily horoscope generator
 */
export function createDailyHoroscopeGenerator(
  reportGenerator: AstroReportGenerator
): DailyHoroscopeGenerator {
  return new DailyHoroscopeGenerator(reportGenerator);
}
