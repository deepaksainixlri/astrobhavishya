/**
 * Vedic Astrology Compatibility Calculator
 *
 * Implements Ashtakoota (Guna Milan) matching system for relationship compatibility.
 * Evaluates 8 different compatibility parameters based on:
 * - Birth charts of both partners
 * - Moon signs (Rashi) and Nakshatras
 * - Planetary positions and strengths
 *
 * Based on classical texts:
 * - Brihat Parashara Hora Shastra
 * - Jataka Parijata
 */

import type { ChartData, Nakshatra, Rashi } from './calculator';

/**
 * Represents one of the 8 Guna (compatibility parameters)
 */
export type GunaType = 'Varna' | 'Vashya' | 'Tara' | 'Yoni' | 'GrahaMaitri' | 'Gana' | 'Bhakoot' | 'Nadi';

/**
 * Score for a single guna
 */
export interface GunaScore {
  guna: GunaType;
  maxPoints: number;
  earnedPoints: number;
  percentage: number;
  description: string;
}

/**
 * Complete compatibility analysis
 */
export interface CompatibilityScore {
  totalScore: number;
  maxScore: number;
  percentage: number;
  compatibility: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  gunaScores: GunaScore[];
  description: string;
  recommendations: string[];
  strengthAreas: string[];
  challengeAreas: string[];
}

/**
 * Vedic Compatibility Calculator
 */
export class CompatibilityCalculator {
  /**
   * Calculate Ashtakoota (8-fold) compatibility between two people
   *
   * @param chart1 Birth chart of first person
   * @param chart2 Birth chart of second person
   * @param gender1 Gender of first person ('M' or 'F')
   * @param gender2 Gender of second person ('M' or 'F')
   * @returns Compatibility score with detailed analysis
   */
  public calculateCompatibility(
    chart1: ChartData,
    chart2: ChartData,
    gender1: 'M' | 'F',
    gender2: 'M' | 'F'
  ): CompatibilityScore {
    const gunaScores: GunaScore[] = [];

    // 1. Varna (Caste/Quality) - 1 point
    const varnaScore = this.calculateVarna(chart1, chart2);
    gunaScores.push(varnaScore);

    // 2. Vashya (Controlling power) - 2 points
    const vashyaScore = this.calculateVashya(chart1, chart2);
    gunaScores.push(vashyaScore);

    // 3. Tara (Longevity) - 3 points
    const taraScore = this.calculateTara(chart1, chart2);
    gunaScores.push(taraScore);

    // 4. Yoni (Sexual compatibility) - 4 points
    const yoniScore = this.calculateYoni(chart1, chart2);
    gunaScores.push(yoniScore);

    // 5. Graha Maitri (Planetary friendship) - 5 points
    const grahaMaitriScore = this.calculateGrahaMaitri(chart1, chart2);
    gunaScores.push(grahaMaitriScore);

    // 6. Gana (Temperament) - 6 points
    const ganaScore = this.calculateGana(chart1, chart2);
    gunaScores.push(ganaScore);

    // 7. Bhakoot (Rashis distance) - 7 points
    const bhakootScore = this.calculateBhakoot(chart1, chart2);
    gunaScores.push(bhakootScore);

    // 8. Nadi (Constitutional compatibility) - 8 points
    const nadiScore = this.calculateNadi(chart1, chart2);
    gunaScores.push(nadiScore);

    // Calculate total score
    const totalScore = gunaScores.reduce((sum, score) => sum + score.earnedPoints, 0);
    const maxScore = 36;
    const percentage = (totalScore / maxScore) * 100;

    // Determine compatibility rating
    const compatibility = this.getCompatibilityRating(totalScore);

    // Get recommendations and descriptions
    const description = this.getCompatibilityDescription(totalScore, percentage);
    const recommendations = this.getRecommendations(totalScore, gunaScores);
    const strengthAreas = this.getStrengthAreas(gunaScores);
    const challengeAreas = this.getChallengeAreas(gunaScores);

    return {
      totalScore,
      maxScore,
      percentage,
      compatibility,
      gunaScores,
      description,
      recommendations,
      strengthAreas,
      challengeAreas,
    };
  }

  /**
   * 1. Varna Guna (Quality/Caste) - 1 point
   *
   * Based on quality of birth moon sign:
   * Brahmin (spiritual): Sagittarius, Pisces
   * Kshatriya (warrior): Aries, Leo, Scorpio
   * Vaishya (merchant): Taurus, Virgo, Capricorn
   * Shudra (labor): Gemini, Libra, Aquarius, Cancer
   */
  private calculateVarna(chart1: ChartData, chart2: ChartData): GunaScore {
    const moonRashi1 = chart1.planets.find(p => p.planet === 'Moon')?.rashi;
    const moonRashi2 = chart2.planets.find(p => p.planet === 'Moon')?.rashi;

    const varna1 = this.getVarna(moonRashi1);
    const varna2 = this.getVarna(moonRashi2);

    // Same varna gets 1 point, adjacent varna gets 0.5, different gets 0
    let points = 0;
    if (varna1 === varna2) {
      points = 1;
    } else if (Math.abs(varna1 - varna2) === 1) {
      points = 0.5;
    }

    return {
      guna: 'Varna',
      maxPoints: 1,
      earnedPoints: points,
      percentage: points,
      description: `Varna compatibility: ${varna1 === varna2 ? 'Matching' : 'Mismatched'} (${['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'][varna1]} & ${['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'][varna2]})`
    };
  }

  /**
   * Get Varna from Rashi (0=Brahmin, 1=Kshatriya, 2=Vaishya, 3=Shudra)
   */
  private getVarna(rashi?: string): number {
    const brahmin = ['Sagittarius', 'Pisces'];
    const kshatriya = ['Aries', 'Leo', 'Scorpio'];
    const vaishya = ['Taurus', 'Virgo', 'Capricorn'];
    const shudra = ['Gemini', 'Libra', 'Aquarius', 'Cancer'];

    if (brahmin.includes(rashi || '')) return 0;
    if (kshatriya.includes(rashi || '')) return 1;
    if (vaishya.includes(rashi || '')) return 2;
    return 3;
  }

  /**
   * 2. Vashya Guna (Controlling power) - 2 points
   *
   * Determines who will dominate in relationship based on moon sign elements.
   * Fire controls Earth, Earth controls Water, Water controls Fire
   */
  private calculateVashya(chart1: ChartData, chart2: ChartData): GunaScore {
    const moonRashi1 = chart1.planets.find(p => p.planet === 'Moon')?.rashi;
    const moonRashi2 = chart2.planets.find(p => p.planet === 'Moon')?.rashi;

    const element1 = this.getElement(moonRashi1);
    const element2 = this.getElement(moonRashi2);

    // Vashya rules: Fire > Earth > Water > Fire
    let points = 0;
    if (element1 === element2) {
      points = 2; // Same element = balanced control
    } else if (
      (element1 === 'Fire' && element2 === 'Earth') ||
      (element1 === 'Earth' && element2 === 'Water') ||
      (element1 === 'Water' && element2 === 'Fire')
    ) {
      points = 2; // Compatible control
    } else if (
      (element1 === 'Air' && element2 === 'Air') ||
      (element1 === 'Air' && [element2].includes('Fire')) ||
      (element1 === 'Air' && [element2].includes('Water')) ||
      (element1 === 'Air' && [element2].includes('Earth'))
    ) {
      points = 1; // Air is universal
    } else {
      points = 0; // Incompatible control
    }

    return {
      guna: 'Vashya',
      maxPoints: 2,
      earnedPoints: points,
      percentage: (points / 2) * 100,
      description: `Controlling power: ${element1} person controls ${element2} (${points}/2 points)`
    };
  }

  /**
   * Get element of Rashi
   */
  private getElement(rashi?: string): string {
    const fire = ['Aries', 'Leo', 'Sagittarius'];
    const earth = ['Taurus', 'Virgo', 'Capricorn'];
    const air = ['Gemini', 'Libra', 'Aquarius'];
    const water = ['Cancer', 'Scorpio', 'Pisces'];

    if (fire.includes(rashi || '')) return 'Fire';
    if (earth.includes(rashi || '')) return 'Earth';
    if (air.includes(rashi || '')) return 'Air';
    if (water.includes(rashi || '')) return 'Water';
    return 'Unknown';
  }

  /**
   * 3. Tara Guna (Longevity/Nakshatra) - 3 points
   *
   * Based on nakshatra number difference:
   * Janam Tara (same): 3 points - auspicious
   * Sampat Tara (2, 5, 8, 10, 13, 18, 22): 3 points - beneficial
   * Vipat Tara (3, 6, 9, 11, 14, 17, 20, 25): 1 point - challenging
   * Kshema Tara (1, 4, 7, 12, 15, 19, 21, 27): 2 points - good
   * Mitra Tara (16, 23, 24, 26): 1.5 points - moderate
   * Ati Mitra Tara (rest): 1 point
   */
  private calculateTara(chart1: ChartData, chart2: ChartData): GunaScore {
    const nakshatra1Index = this.getNakshatraIndex(chart1.planets.find(p => p.planet === 'Moon')?.nakshatra);
    const nakshatra2Index = this.getNakshatraIndex(chart2.planets.find(p => p.planet === 'Moon')?.nakshatra);

    const diff = Math.abs(nakshatra2Index - nakshatra1Index);

    let points = 0;
    let type = '';

    if (diff === 0) {
      points = 3;
      type = 'Janam Tara (same)';
    } else if ([2, 5, 8, 10, 13, 18, 22].includes(diff)) {
      points = 3;
      type = 'Sampat Tara (beneficial)';
    } else if ([3, 6, 9, 11, 14, 17, 20, 25].includes(diff)) {
      points = 1;
      type = 'Vipat Tara (challenging)';
    } else if ([1, 4, 7, 12, 15, 19, 21, 27].includes(diff)) {
      points = 2;
      type = 'Kshema Tara (good)';
    } else if ([16, 23, 24, 26].includes(diff)) {
      points = 1.5;
      type = 'Mitra Tara (moderate)';
    } else {
      points = 1;
      type = 'Ati Mitra Tara';
    }

    return {
      guna: 'Tara',
      maxPoints: 3,
      earnedPoints: points,
      percentage: (points / 3) * 100,
      description: `Longevity/Nakshatra compatibility: ${type}`
    };
  }

  /**
   * Get nakshatra index (0-26)
   */
  private getNakshatraIndex(nakshatra?: string): number {
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    return nakshatras.indexOf(nakshatra || '') + 1;
  }

  /**
   * 4. Yoni Guna (Sexual/Physical compatibility) - 4 points
   *
   * Based on animal symbolism of nakshatras.
   * Friendly yonis: 4 points
   * Neutral yonis: 2 points
   * Unfriendly yonis: 1 point
   */
  private calculateYoni(chart1: ChartData, chart2: ChartData): GunaScore {
    const nakshatra1 = chart1.planets.find(p => p.planet === 'Moon')?.nakshatra;
    const nakshatra2 = chart2.planets.find(p => p.planet === 'Moon')?.nakshatra;

    const yoni1 = this.getNakshatraYoni(nakshatra1);
    const yoni2 = this.getNakshatraYoni(nakshatra2);

    // Friendly yoni pairs (can be expanded)
    const friendlyPairs = [
      ['Horse', 'Horse'], ['Elephant', 'Elephant'], ['Sheep', 'Sheep'],
      ['Dog', 'Dog'], ['Cat', 'Cat'], ['Rat', 'Rat'], ['Boar', 'Boar'],
      ['Horse', 'Goat'], ['Elephant', 'Lion'], ['Sheep', 'Goat'],
    ];

    // Unfriendly pairs
    const unfriendlyPairs = [
      ['Horse', 'Buffalo'], ['Dog', 'Deer'], ['Cat', 'Rat'], ['Lion', 'Monkey'],
    ];

    let points = 2; // Default to neutral

    if (yoni1 === yoni2) {
      points = 4; // Same yoni is very auspicious
    } else if (friendlyPairs.some(pair =>
      (pair[0] === yoni1 && pair[1] === yoni2) ||
      (pair[0] === yoni2 && pair[1] === yoni1)
    )) {
      points = 4;
    } else if (unfriendlyPairs.some(pair =>
      (pair[0] === yoni1 && pair[1] === yoni2) ||
      (pair[0] === yoni2 && pair[1] === yoni1)
    )) {
      points = 1;
    }

    return {
      guna: 'Yoni',
      maxPoints: 4,
      earnedPoints: points,
      percentage: (points / 4) * 100,
      description: `Sexual/Physical compatibility: ${yoni1} & ${yoni2} (${points}/4 points)`
    };
  }

  /**
   * Get yoni (animal) for nakshatra
   */
  private getNakshatraYoni(nakshatra?: string): string {
    const yoniMap: Record<string, string> = {
      'Ashwini': 'Horse', 'Bharani': 'Elephant', 'Krittika': 'Goat',
      'Rohini': 'Serpent', 'Mrigashirsha': 'Serpent', 'Ardra': 'Dog',
      'Punarvasu': 'Cat', 'Pushya': 'Goat', 'Ashlesha': 'Serpent',
      'Magha': 'Rat', 'Purva Phalguni': 'Rat', 'Uttara Phalguni': 'Cow',
      'Hasta': 'Buffalo', 'Chitra': 'Tiger', 'Swati': 'Buffalo',
      'Vishakha': 'Tiger', 'Anuradha': 'Deer', 'Jyeshtha': 'Monkey',
      'Mula': 'Dog', 'Purva Ashadha': 'Monkey', 'Uttara Ashadha': 'Mongoose',
      'Shravana': 'Monkey', 'Dhanishtha': 'Lion', 'Shatabhisha': 'Horse',
      'Purva Bhadrapada': 'Lion', 'Uttara Bhadrapada': 'Cow', 'Revati': 'Elephant'
    };
    return yoniMap[nakshatra || ''] || 'Unknown';
  }

  /**
   * 5. Graha Maitri (Planetary Friendship) - 5 points
   *
   * Based on friendship between planet lords of moon signs
   */
  private calculateGrahaMaitri(chart1: ChartData, chart2: ChartData): GunaScore {
    const moonRashi1 = chart1.planets.find(p => p.planet === 'Moon')?.rashi;
    const moonRashi2 = chart2.planets.find(p => p.planet === 'Moon')?.rashi;

    const ruler1 = this.getRashiRuler(moonRashi1);
    const ruler2 = this.getRashiRuler(moonRashi2);

    const friendship = this.getPlanetaryFriendship(ruler1, ruler2);

    let points = 0;
    if (friendship === 'friend') {
      points = 5;
    } else if (friendship === 'neutral') {
      points = 2.5;
    } else if (friendship === 'enemy') {
      points = 0;
    }

    return {
      guna: 'GrahaMaitri',
      maxPoints: 5,
      earnedPoints: points,
      percentage: (points / 5) * 100,
      description: `Planetary friendship: ${ruler1} and ${ruler2} are ${friendship}s`
    };
  }

  /**
   * Get ruling planet for Rashi
   */
  private getRashiRuler(rashi?: string): string {
    const rulers: Record<string, string> = {
      'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury',
      'Cancer': 'Moon', 'Leo': 'Sun', 'Virgo': 'Mercury',
      'Libra': 'Venus', 'Scorpio': 'Mars', 'Sagittarius': 'Jupiter',
      'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
    };
    return rulers[rashi || ''] || 'Unknown';
  }

  /**
   * Get planetary friendship relationship
   */
  private getPlanetaryFriendship(planet1: string, planet2: string): 'friend' | 'neutral' | 'enemy' {
    // Natural friends/enemies in Vedic astrology
    const friendships: Record<string, string[]> = {
      'Sun': ['Moon', 'Mars', 'Jupiter'],
      'Moon': ['Sun', 'Mercury'],
      'Mars': ['Sun', 'Moon', 'Jupiter'],
      'Mercury': ['Sun', 'Venus'],
      'Jupiter': ['Sun', 'Moon', 'Mars'],
      'Venus': ['Mercury', 'Saturn'],
      'Saturn': ['Mercury', 'Venus'],
    };

    if (planet1 === planet2) return 'friend';
    if (friendships[planet1]?.includes(planet2)) return 'friend';
    if (friendships[planet2]?.includes(planet1)) return 'friend';

    // Neutral by default if not explicitly enemy
    return 'neutral';
  }

  /**
   * 6. Gana (Nature/Temperament) - 6 points
   *
   * Three types: Deva (divine), Manushya (human), Rakshasa (demon)
   * Same gana: 6 points
   * Deva-Manushya or Manushya-Rakshasa: 5 points
   * Deva-Rakshasa: 1 point
   */
  private calculateGana(chart1: ChartData, chart2: ChartData): GunaScore {
    const nakshatra1 = chart1.planets.find(p => p.planet === 'Moon')?.nakshatra;
    const nakshatra2 = chart2.planets.find(p => p.planet === 'Moon')?.nakshatra;

    const gana1 = this.getNakshatraGana(nakshatra1);
    const gana2 = this.getNakshatraGana(nakshatra2);

    let points = 0;
    if (gana1 === gana2) {
      points = 6;
    } else if (
      (gana1 === 'Deva' && gana2 === 'Manushya') ||
      (gana1 === 'Manushya' && gana2 === 'Deva') ||
      (gana1 === 'Manushya' && gana2 === 'Rakshasa') ||
      (gana1 === 'Rakshasa' && gana2 === 'Manushya')
    ) {
      points = 5;
    } else if (
      (gana1 === 'Deva' && gana2 === 'Rakshasa') ||
      (gana1 === 'Rakshasa' && gana2 === 'Deva')
    ) {
      points = 1;
    }

    return {
      guna: 'Gana',
      maxPoints: 6,
      earnedPoints: points,
      percentage: (points / 6) * 100,
      description: `Temperament compatibility: ${gana1} & ${gana2}`
    };
  }

  /**
   * Get Gana (nature) of nakshatra
   * Deva (divine): Ashwini, Pushya, Hasta, Anuradha, Uttara Ashadha, Uttara Bhadrapada, Revati
   * Manushya (human): Bharani, Krittika, Rohini, Mrigashirsha, Punarvasu, Magha, Chitra, Swati, Dhanishtha
   * Rakshasa (demon): Ardra, Ashlesha, Jyeshtha, Mula, Purva Ashadha, Purva Bhadrapada, Shatabhisha, Vishakha
   */
  private getNakshatraGana(nakshatra?: string): 'Deva' | 'Manushya' | 'Rakshasa' {
    const deva = ['Ashwini', 'Pushya', 'Hasta', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'];
    const manushya = ['Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Punarvasu', 'Magha', 'Chitra', 'Swati', 'Dhanishtha'];
    const rakshasa = ['Ardra', 'Ashlesha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Purva Bhadrapada', 'Shatabhisha', 'Vishakha'];

    if (deva.includes(nakshatra || '')) return 'Deva';
    if (manushya.includes(nakshatra || '')) return 'Manushya';
    return 'Rakshasa';
  }

  /**
   * 7. Bhakoot Guna (Rashi distance/House position) - 7 points
   *
   * If Rashis are: Same/5th-9th apart: 7 points
   * 2nd/12th apart: 6 points
   * 3rd/11th apart: 4 points
   * 4th/8th apart: 3 points
   * 6th/7th apart: 1 point
   */
  private calculateBhakoot(chart1: ChartData, chart2: ChartData): GunaScore {
    const rashiMap: Record<string, number> = {
      'Aries': 1, 'Taurus': 2, 'Gemini': 3, 'Cancer': 4, 'Leo': 5,
      'Virgo': 6, 'Libra': 7, 'Scorpio': 8, 'Sagittarius': 9,
      'Capricorn': 10, 'Aquarius': 11, 'Pisces': 12
    };

    const moonRashi1 = chart1.planets.find(p => p.planet === 'Moon')?.rashi;
    const moonRashi2 = chart2.planets.find(p => p.planet === 'Moon')?.rashi;

    const number1 = rashiMap[moonRashi1 || ''] || 0;
    const number2 = rashiMap[moonRashi2 || ''] || 0;

    const diff = Math.abs(number1 - number2);
    const normalizedDiff = diff <= 6 ? diff : 12 - diff;

    let points = 0;
    if (normalizedDiff === 0 || normalizedDiff === 5 || normalizedDiff === 9) {
      points = 7;
    } else if (normalizedDiff === 2 || normalizedDiff === 12) {
      points = 6;
    } else if (normalizedDiff === 3 || normalizedDiff === 11) {
      points = 4;
    } else if (normalizedDiff === 4 || normalizedDiff === 8) {
      points = 3;
    } else if (normalizedDiff === 6 || normalizedDiff === 7) {
      points = 1;
    }

    return {
      guna: 'Bhakoot',
      maxPoints: 7,
      earnedPoints: points,
      percentage: (points / 7) * 100,
      description: `Rashi distance compatibility: ${normalizedDiff} signs apart`
    };
  }

  /**
   * 8. Nadi Guna (Constitutional/Health compatibility) - 8 points
   *
   * Three nadis: Vata (air), Pitta (fire), Kapha (water)
   * Same nadi: 8 points
   * Different nadi: 0 points (most important - mismatches can cause health issues)
   */
  private calculateNadi(chart1: ChartData, chart2: ChartData): GunaScore {
    const nakshatra1 = chart1.planets.find(p => p.planet === 'Moon')?.nakshatra;
    const nakshatra2 = chart2.planets.find(p => p.planet === 'Moon')?.nakshatra;

    const nadi1 = this.getNakshatraNadi(nakshatra1);
    const nadi2 = this.getNakshatraNadi(nakshatra2);

    // Same nadi is auspicious, different nadi is highly inauspicious
    const points = nadi1 === nadi2 ? 8 : 0;

    return {
      guna: 'Nadi',
      maxPoints: 8,
      earnedPoints: points,
      percentage: (points / 8) * 100,
      description: `Constitutional compatibility: ${nadi1} & ${nadi2} (${points}/8 points)`
    };
  }

  /**
   * Get Nadi (constitutional type) of nakshatra
   * Vata (air): Ashwini, Ardra, Punarvasu, Swati, Dhanishtha, Shatabhisha
   * Pitta (fire): Krittika, Magha, Mula, Purva Ashadha, Purva Phalguni, Uttara Ashadha, Uttara Phalguni
   * Kapha (water): Bharani, Rohini, Ashlesha, Pushya, Hasta, Chitra, Anuradha, Jyeshtha, Vishakha, Purva Bhadrapada, Uttara Bhadrapada, Revati
   */
  private getNakshatraNadi(nakshatra?: string): 'Vata' | 'Pitta' | 'Kapha' {
    const vata = ['Ashwini', 'Ardra', 'Punarvasu', 'Swati', 'Dhanishtha', 'Shatabhisha'];
    const pitta = ['Krittika', 'Magha', 'Mula', 'Purva Ashadha', 'Purva Phalguni', 'Uttara Ashadha', 'Uttara Phalguni'];
    const kapha = ['Bharani', 'Rohini', 'Ashlesha', 'Pushya', 'Hasta', 'Chitra', 'Anuradha', 'Jyeshtha', 'Vishakha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];

    if (vata.includes(nakshatra || '')) return 'Vata';
    if (pitta.includes(nakshatra || '')) return 'Pitta';
    return 'Kapha';
  }

  /**
   * Get compatibility rating based on total score
   */
  private getCompatibilityRating(
    totalScore: number
  ): 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor' | 'Very Poor' {
    if (totalScore >= 32) return 'Excellent';
    if (totalScore >= 26) return 'Very Good';
    if (totalScore >= 20) return 'Good';
    if (totalScore >= 14) return 'Fair';
    if (totalScore >= 8) return 'Poor';
    return 'Very Poor';
  }

  /**
   * Get detailed compatibility description
   */
  private getCompatibilityDescription(totalScore: number, percentage: number): string {
    const descriptions = {
      excellent: 'Excellent compatibility. Both partners are well-matched across all parameters. This union is highly auspicious and promises harmony, happiness, and mutual support. Strong intellectual, emotional, and physical compatibility.',
      veryGood: 'Very good compatibility. The couple shares strong compatibility in most areas. Minor adjustments may be needed, but overall this is a very favorable match with good prospects for a harmonious and lasting relationship.',
      good: 'Good compatibility. The couple can build a good life together with some effort and understanding. While there are some areas of difference, these can be managed with communication and compromise.',
      fair: 'Fair compatibility. The couple has some matching areas and some challenging areas. Success depends on both partners\' willingness to work on understanding and adjusting to each other\'s needs.',
      poor: 'Poor compatibility. There are significant differences that may create challenges. Both partners should be prepared for potential conflicts. Counseling and astrological remedies are recommended.',
      veryPoor: 'Very poor compatibility. Major incompatibilities exist. This union is considered inauspicious in Vedic astrology. Serious consideration and consultation with an experienced astrologer is strongly advised before proceeding.'
    };

    if (totalScore >= 32) return descriptions.excellent;
    if (totalScore >= 26) return descriptions.veryGood;
    if (totalScore >= 20) return descriptions.good;
    if (totalScore >= 14) return descriptions.fair;
    if (totalScore >= 8) return descriptions.poor;
    return descriptions.veryPoor;
  }

  /**
   * Get personalized recommendations
   */
  private getRecommendations(totalScore: number, gunaScores: GunaScore[]): string[] {
    const recommendations: string[] = [];

    const weakAreas = gunaScores.filter(g => g.earnedPoints < g.maxPoints * 0.5);

    if (weakAreas.length > 0) {
      recommendations.push('Consult with an experienced Vedic astrologer for personalized remedies.');
      recommendations.push('Consider performing astrological rituals to strengthen positive planetary positions.');
    }

    const nadiScore = gunaScores.find(g => g.guna === 'Nadi');
    if (nadiScore && nadiScore.earnedPoints === 0) {
      recommendations.push('Nadi compatibility is very weak. Seek astrological remedies and counseling.');
    }

    const tarScore = gunaScores.find(g => g.guna === 'Tara');
    if (tarScore && tarScore.earnedPoints === 1) {
      recommendations.push('Conduct appropriate remedies for Vipat Tara to mitigate health-related issues.');
    }

    if (totalScore >= 32) {
      recommendations.push('This is an excellent match. Celebrate this wonderful compatibility!');
    } else if (totalScore >= 26) {
      recommendations.push('Overall very good match. Minor adjustments may be helpful for optimal harmony.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Discuss any compatibility concerns with an astrologer for personalized guidance.');
    }

    return recommendations;
  }

  /**
   * Get strength areas from guna scores
   */
  private getStrengthAreas(gunaScores: GunaScore[]): string[] {
    return gunaScores
      .filter(g => g.earnedPoints >= g.maxPoints * 0.75)
      .map(g => `${g.guna}: ${g.description}`);
  }

  /**
   * Get challenge areas from guna scores
   */
  private getChallengeAreas(gunaScores: GunaScore[]): string[] {
    return gunaScores
      .filter(g => g.earnedPoints < g.maxPoints * 0.5)
      .map(g => `${g.guna}: ${g.description}`);
  }
}
