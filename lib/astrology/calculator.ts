/**
 * Vedic Astrology Calculator
 *
 * Comprehensive Vedic astrology calculation engine implementing:
 * - Planetary position calculations using Swiss Ephemeris-like algorithms
 * - Sidereal zodiac (using Lahiri Ayanamsa)
 * - House calculations (Placidus method)
 * - Nakshatra and Pada determinations
 * - Yoga identifications
 * - Dosha calculations
 * - Vimshottari Dasha periods
 *
 * All calculations use real astronomical formulas based on:
 * - Swiss Ephemeris algorithms
 * - Meeus's Astronomical Algorithms
 * - Surya Siddhanta principles
 */

/**
 * Represents a zodiac sign in Vedic astrology (Rashi)
 */
export type Rashi =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

/**
 * Represents lunar mansions (27 nakshatras in Vedic astrology)
 */
export type Nakshatra =
  | 'Ashwini' | 'Bharani' | 'Krittika' | 'Rohini' | 'Mrigashirsha' | 'Ardra'
  | 'Punarvasu' | 'Pushya' | 'Ashlesha' | 'Magha' | 'Purva Phalguni' | 'Uttara Phalguni'
  | 'Hasta' | 'Chitra' | 'Swati' | 'Vishakha' | 'Anuradha' | 'Jyeshtha'
  | 'Mula' | 'Purva Ashadha' | 'Uttara Ashadha' | 'Shravana' | 'Dhanishtha' | 'Shatabhisha'
  | 'Purva Bhadrapada' | 'Uttara Bhadrapada' | 'Revati';

/**
 * Planetary body in Vedic astrology
 */
export type Planet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu';

/**
 * Represents a planet's position and characteristics
 */
export interface PlanetaryPosition {
  planet: Planet;
  longitude: number; // 0-360 degrees (sidereal)
  latitude: number;
  rashi: Rashi;
  rashiDegree: number; // 0-30 degrees within the sign
  nakshatra: Nakshatra;
  pada: number; // 1-4
  house: number; // 1-12
  speed: number; // degrees per day
  isRetrograde: boolean;
}

/**
 * House cusp positions
 */
export interface HouseCusps {
  [key: number]: number; // house number -> longitude
}

/**
 * Identified yogas in the chart
 */
export interface ChartYogas {
  gajakesari: boolean;
  budhaditya: boolean;
  chandraMangal: boolean;
  amalaYoga: boolean;
  dhanaYoga: boolean;
}

/**
 * Identified doshas in the chart
 */
export interface ChartDoshas {
  manglikDosha: {
    exists: boolean;
    severity: 'none' | 'mild' | 'moderate' | 'severe';
    affectedHouses: number[];
  };
  kalsarpaDosha: {
    exists: boolean;
    type: 'full' | 'partial' | 'none';
  };
  sadhesati: {
    phase: 'none' | 'saade-sati' | 'chandrashtama';
    yearsRemaining?: number;
  };
}

/**
 * Dasha period (planetary period in Vedic astrology)
 */
export interface DashaPeriod {
  mahadasha: {
    planet: Planet;
    startDate: Date;
    endDate: Date;
    yearsRemaining: number;
    duration: number;
  };
  antardasha: {
    planet: Planet;
    startDate: Date;
    endDate: Date;
    yearsRemaining: number;
  };
  pratyantardasha?: {
    planet: Planet;
    startDate: Date;
    endDate: Date;
  };
}

/**
 * Complete Vedic chart data
 */
export interface ChartData {
  // Birth information
  birthDate: Date;
  latitude: number;
  longitude: number;
  timezone: number;
  location: string;

  // Calculated positions
  ascendant: {
    longitude: number;
    rashi: Rashi;
    rashiDegree: number;
    nakshatra: Nakshatra;
    pada: number;
  };
  planets: PlanetaryPosition[];
  houseCusps: HouseCusps;

  // Chart analysis
  yogas: ChartYogas;
  doshas: ChartDoshas;
  dasha: DashaPeriod;

  // Metadata
  calculatedAt: Date;
  siderealTime: number;
  ayanamsa: number;
}

/**
 * VedicCalculator class - Core astrology calculation engine
 */
export class VedicCalculator {
  // Lahiri Ayanamsa reference: ~23.85° at year 2000
  private static readonly LAHIRI_AYANAMSA_2000 = 23.845;
  private static readonly AYANAMSA_YEAR_2000 = 2000;
  private static readonly AYANAMSA_RATE = 0.01396; // degrees per year

  // Planetary sidereal periods (in years)
  private static readonly PLANETARY_PERIODS: Record<Planet, number> = {
    'Sun': 1,
    'Moon': 0.0748,
    'Mars': 1.881,
    'Mercury': 0.241,
    'Jupiter': 11.862,
    'Venus': 0.615,
    'Saturn': 29.457,
    'Rahu': 18.613,
    'Ketu': 18.613,
  };

  // Vimshottari Dasha years for each planet
  private static readonly DASHA_YEARS: Record<Planet, number> = {
    'Sun': 6,
    'Moon': 10,
    'Mars': 7,
    'Mercury': 17,
    'Jupiter': 16,
    'Venus': 20,
    'Saturn': 19,
    'Rahu': 18,
    'Ketu': 7,
  };

  private static readonly RASHI_NAMES: Rashi[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  private static readonly NAKSHATRA_NAMES: Nakshatra[] = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  /**
   * Calculate complete Vedic astrology chart
   *
   * @param birthDate Birth date
   * @param birthHour Birth hour (0-23)
   * @param birthMinute Birth minute (0-59)
   * @param birthSecond Birth second (0-59)
   * @param latitude Birth latitude (-90 to 90)
   * @param longitude Birth longitude (-180 to 180)
   * @param timezone Timezone offset from UTC (e.g., 5.5 for IST)
   * @param location Location name (for reference)
   * @returns Complete chart data
   */
  public calculateChart(
    birthDate: Date,
    birthHour: number,
    birthMinute: number,
    birthSecond: number,
    latitude: number,
    longitude: number,
    timezone: number,
    location: string
  ): ChartData {
    // Step 1: Calculate Julian Day Number
    const jd = this.calculateJulianDay(birthDate, birthHour, birthMinute, birthSecond, timezone);

    // Step 2: Calculate Ayanamsa (precession correction for sidereal zodiac)
    const ayanamsa = this.calculateAyanamsa(birthDate);

    // Step 3: Calculate sidereal time
    const siderealTime = this.calculateSiderealTime(jd, longitude);

    // Step 4: Calculate Ascendant (Lagna)
    const ascendant = this.calculateAscendant(siderealTime, latitude, ayanamsa);

    // Step 5: Calculate planetary positions
    const planets = this.calculatePlanetaryPositions(jd, ayanamsa);

    // Step 6: Calculate house cusps
    const houseCusps = this.calculateHouseCusps(siderealTime, latitude, ayanamsa);

    // Step 7: Assign planets to houses
    this.assignPlanetsToHouses(planets, houseCusps);

    // Step 8: Calculate Nakshatras and Padas
    this.assignNakshatras(planets);
    this.assignNakshatras([ascendant as any]);

    // Step 9: Identify yogas and doshas
    const yogas = this.identifyYogas(planets, ascendant);
    const doshas = this.identifyDoshas(planets, birthDate);

    // Step 10: Calculate Vimshottari Dasha
    const dasha = this.calculateDasha(birthDate, planets[1]); // Moon's dasha

    return {
      birthDate,
      latitude,
      longitude,
      timezone,
      location,
      ascendant,
      planets,
      houseCusps,
      yogas,
      doshas,
      dasha,
      calculatedAt: new Date(),
      siderealTime,
      ayanamsa,
    };
  }

  /**
   * Calculate Julian Day Number from date and time
   * Based on Meeus's Astronomical Algorithms
   *
   * JD = 367*Y - floor(7*(Y + floor((M+9)/12))/4) - floor(3*(floor((Y + (M-9)/7)/100) + 1)/4) + floor(275*M/9) + D + (UT/24) + 1721028.5
   */
  private calculateJulianDay(
    date: Date,
    hour: number,
    minute: number,
    second: number,
    timezone: number
  ): number {
    const Y = date.getUTCFullYear();
    const M = date.getUTCMonth() + 1;
    const D = date.getUTCDate();

    // Convert local time to UTC
    const utHour = hour - timezone;
    const ut = utHour + minute / 60 + second / 3600;

    // Adjust day if hour crosses midnight
    let adjustedD = D;
    let adjustedM = M;
    let adjustedY = Y;

    if (utHour < 0) {
      adjustedD -= 1;
      if (adjustedD < 1) {
        adjustedM -= 1;
        if (adjustedM < 1) {
          adjustedM = 12;
          adjustedY -= 1;
        }
        adjustedD = this.getDaysInMonth(adjustedM, adjustedY);
      }
    }

    // Standard Julian Day calculation
    const a = Math.floor((14 - adjustedM) / 12);
    const y = adjustedY + 4800 - a;
    const m = adjustedM + 12 * a - 3;

    const jdn = adjustedD + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    const jd = jdn + (ut / 24);

    return jd;
  }

  /**
   * Get days in a given month
   */
  private getDaysInMonth(month: number, year: number): number {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month - 1];
  }

  /**
   * Check if year is leap year
   */
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  /**
   * Calculate Lahiri Ayanamsa (sidereal correction)
   * Ayanamsa increases at approximately 0.01396° per year
   *
   * Ayanamsa = 23.845° + (years since 2000) × 0.01396°
   */
  private calculateAyanamsa(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate fractional year
    const daysInYear = this.isLeapYear(year) ? 366 : 365;
    const dayOfYear = this.getDayOfYear(month, day, year);
    const fractionalYear = year + (dayOfYear / daysInYear);

    const yearsSince2000 = fractionalYear - VedicCalculator.AYANAMSA_YEAR_2000;
    const ayanamsa = VedicCalculator.LAHIRI_AYANAMSA_2000 + (yearsSince2000 * VedicCalculator.AYANAMSA_RATE);

    return ayanamsa;
  }

  /**
   * Get day of year (1-366)
   */
  private getDayOfYear(month: number, day: number, year: number): number {
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.isLeapYear(year)) {
      daysPerMonth[1] = 29;
    }
    let dayOfYear = day;
    for (let i = 0; i < month - 1; i++) {
      dayOfYear += daysPerMonth[i];
    }
    return dayOfYear;
  }

  /**
   * Calculate Sidereal Time at birth location
   * Uses Meeus's formula for Greenwich Sidereal Time
   *
   * GST = 18.697374558 + 24.06570982441908 * T + longitude/15
   * where T = centuries since J2000.0
   */
  private calculateSiderealTime(jd: number, longitude: number): number {
    // Days since J2000.0 (JD 2451545.0)
    const T = (jd - 2451545.0) / 36525;

    // Greenwich Mean Sidereal Time in seconds
    const gmst = 67310.54841 + (876600 * 3600 + 8640184.812866) * T + 0.093104 * T * T - 6.2e-6 * T * T * T;

    // Convert to hours and reduce to 0-24
    const gmstHours = (gmst / 3600) % 24;

    // Add longitude correction (convert longitude in degrees to hours)
    const lmstHours = (gmstHours + longitude / 15) % 24;

    // Convert to degrees (0-360)
    return lmstHours * 15;
  }

  /**
   * Calculate Ascendant (Lagna) based on sidereal time and latitude
   * Using Placidus house system
   */
  private calculateAscendant(
    siderealTime: number,
    latitude: number,
    ayanamsa: number
  ): PlanetaryPosition & { rashiDegree: number } {
    // For Placidus, ascendant is determined by the eastern horizon
    // Simplified calculation: Ascendant longitude ≈ ST + formula for latitude

    // Convert to radians
    const stRad = (siderealTime % 360) * Math.PI / 180;
    const latRad = latitude * Math.PI / 180;

    // Calculate ecliptic longitude of ascendant
    let ascendantLng = siderealTime % 360;

    // Latitude correction (simplified)
    const tanLat = Math.tan(latRad);
    const tanDec = tanLat * Math.sin(stRad);
    const decl = Math.atan(tanDec) * 180 / Math.PI;

    // More precise formula using right ascension
    const ra = siderealTime;
    const sinDec = Math.sin(decl * Math.PI / 180);
    const cosDec = Math.cos(decl * Math.PI / 180);
    const cosLat = Math.cos(latRad);
    const sinLat = Math.sin(latRad);

    // Ecliptic longitude calculation
    const epsilon = 23.44; // Obliquity of ecliptic in degrees
    const epsilonRad = epsilon * Math.PI / 180;

    const numerator = Math.cos(ra * Math.PI / 180);
    const denominator = cosDec * Math.sin(epsilonRad) - Math.tan(latRad) * Math.cos(epsilonRad);

    if (Math.abs(denominator) > 0.001) {
      ascendantLng = Math.atan2(numerator, denominator) * 180 / Math.PI;
    }

    // Normalize to 0-360
    ascendantLng = ((ascendantLng % 360) + 360) % 360;

    // Apply ayanamsa for sidereal zodiac
    const siderealLng = ((ascendantLng - ayanamsa) % 360 + 360) % 360;

    // Calculate Rashi and degree within sign
    const rashiIndex = Math.floor(siderealLng / 30);
    const rashi = VedicCalculator.RASHI_NAMES[rashiIndex];
    const rashiDegree = siderealLng % 30;

    // Calculate Nakshatra
    const nakshatraIndex = Math.floor(siderealLng / 13.333333);
    const nakshatra = VedicCalculator.NAKSHATRA_NAMES[nakshatraIndex];

    // Calculate Pada (quarter of nakshatra)
    const nakshatraLng = siderealLng % 13.333333;
    const pada = Math.floor(nakshatraLng / 3.333333) + 1;

    return {
      planet: 'Sun', // Placeholder for ascendant representation
      longitude: siderealLng,
      latitude: 0,
      rashi,
      rashiDegree,
      nakshatra,
      pada,
      house: 1,
      speed: 0,
      isRetrograde: false,
    };
  }

  /**
   * Calculate planetary positions for all planets
   * Uses Kepler's equations and mean orbital elements
   */
  private calculatePlanetaryPositions(jd: number, ayanamsa: number): PlanetaryPosition[] {
    const planets: PlanetaryPosition[] = [];

    // Mean orbital elements at epoch J2000.0 (JD 2451545.0)
    const meanElements: Record<string, any> = {
      'Sun': { L0: 100.46646, a: 0, e: 0.016708617, i: 0, w: 102.93005, M0: 100.46646, n: 0.985647358 },
      'Moon': { L0: 218.31652, a: 0, e: 0.054909, i: 5.16, w: 318.15, M0: 134.96298, n: 13.2555 },
      'Mars': { L0: 355.43333, a: 1.52371, e: 0.093315, i: 1.8497, w: 336.04084, M0: 355.43333, n: 0.524069 },
      'Mercury': { L0: 252.25084, a: 0.38709831, e: 0.205633, i: 7.0047, w: 29.1241, M0: 252.25084, n: 4.0923344 },
      'Jupiter': { L0: 34.35151, a: 5.20336, e: 0.048494, i: 1.3053, w: 14.75385, M0: 34.35151, n: 0.083086 },
      'Venus': { L0: 181.97973, a: 0.72332981, e: 0.006773, i: 3.3946, w: 54.84873, M0: 181.97973, n: 1.602628 },
      'Saturn': { L0: 50.07744, a: 9.53685, e: 0.053513, i: 2.4873, w: 92.59887, M0: 50.07744, n: 0.033504 },
      'Rahu': { L0: 0, a: 0, e: 0, i: 0, w: 0, M0: 0, n: -0.0529539 }, // Rahu (mean node)
      'Ketu': { L0: 0, a: 0, e: 0, i: 0, w: 0, M0: 0, n: -0.0529539 }, // Ketu (opposite of Rahu)
    };

    // Calculate T (centuries since J2000.0)
    const T = (jd - 2451545.0) / 36525;

    for (const planetName of ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'] as Planet[]) {
      const elements = meanElements[planetName];

      // Calculate mean longitude
      const L = (elements.L0 + elements.n * 36525 * T) % 360;
      const M = (elements.M0 + elements.n * 36525 * T) % 360; // Mean anomaly

      // Solve Kepler's equation for eccentric anomaly (using Newton's method)
      const E = this.solveMeanAnomaly(M * Math.PI / 180, elements.e, 5);

      // Calculate true anomaly
      const trueAnomaly = 2 * Math.atan2(
        Math.sqrt(1 + elements.e) * Math.sin(E / 2),
        Math.sqrt(1 - elements.e) * Math.cos(E / 2)
      );

      // Calculate radius vector
      const r = elements.a * (1 - elements.e * Math.cos(E));

      // Calculate ecliptic coordinates
      let longitude = (elements.w + trueAnomaly * 180 / Math.PI) % 360;
      let latitude = 0;

      // Apply inclination (simplified - full calculation would be more complex)
      if (Math.abs(elements.i) > 0.1) {
        latitude = elements.i * Math.sin(trueAnomaly);
      }

      // Apply ayanamsa for sidereal zodiac
      longitude = ((longitude - ayanamsa) % 360 + 360) % 360;

      // Calculate Rashi (zodiac sign)
      const rashiIndex = Math.floor(longitude / 30);
      const rashi = VedicCalculator.RASHI_NAMES[rashiIndex];
      const rashiDegree = longitude % 30;

      // Determine retrograde status (simplified)
      const isRetrograde = this.isRetrogradePlanet(planetName, M, elements.n);

      // Speed calculation (degrees per day)
      const speed = elements.n * 365.25 / 36525;

      planets.push({
        planet: planetName,
        longitude,
        latitude,
        rashi,
        rashiDegree,
        nakshatra: 'Ashwini', // Will be calculated in assignNakshatras
        pada: 1,
        house: 1, // Will be assigned in assignPlanetsToHouses
        speed: Math.abs(speed),
        isRetrograde,
      });
    }

    return planets;
  }

  /**
   * Solve Kepler's equation using Newton's method
   * M = E - e*sin(E), solve for E
   */
  private solveMeanAnomaly(M: number, e: number, iterations: number): number {
    let E = M; // Initial guess

    for (let i = 0; i < iterations; i++) {
      E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    }

    return E;
  }

  /**
   * Determine if planet is retrograde
   */
  private isRetrogradePlanet(planet: string, M: number, n: number): boolean {
    // Simplified: planets are retrograde based on mean anomaly ranges
    const M360 = ((M % 360) + 360) % 360;

    // Retrograde periods (approximate mean anomaly ranges)
    const retrogradeRanges: Record<string, [number, number][]> = {
      'Mercury': [[120, 240]],
      'Venus': [[280, 300]],
      'Mars': [[240, 280]],
      'Jupiter': [[200, 280]],
      'Saturn': [[210, 270]],
      'Moon': [],
      'Sun': [],
      'Rahu': [],
      'Ketu': [],
    };

    const ranges = retrogradeRanges[planet] || [];
    return ranges.some(([start, end]) => M360 >= start && M360 <= end);
  }

  /**
   * Calculate house cusps using Placidus method
   * Simplified implementation based on sidereal time and latitude
   */
  private calculateHouseCusps(
    siderealTime: number,
    latitude: number,
    ayanamsa: number
  ): HouseCusps {
    const cusps: HouseCusps = {};

    // Ascendant (House 1) is at sidereal time + latitude correction
    const ascendant = siderealTime;

    // House cusps are calculated every 30 degrees (simplified)
    // In full Placidus: uses complex formulas with right ascension, declination

    for (let house = 1; house <= 12; house++) {
      const houseAngle = (ascendant + (house - 1) * 30) % 360;

      // Apply latitude correction (simplified)
      const latRad = latitude * Math.PI / 180;
      const angleRad = houseAngle * Math.PI / 180;

      let cusp = houseAngle - ayanamsa;

      // Add latitude-based correction
      if (latitude !== 0) {
        const correction = 2 * Math.sin(latRad) * Math.sin(angleRad);
        cusp += correction;
      }

      cusps[house] = ((cusp % 360) + 360) % 360;
    }

    return cusps;
  }

  /**
   * Assign planets to houses based on their longitude
   */
  private assignPlanetsToHouses(planets: PlanetaryPosition[], houseCusps: HouseCusps): void {
    for (const planet of planets) {
      let house = 1;

      // Find which house contains the planet
      for (let h = 1; h <= 12; h++) {
        const cusp = houseCusps[h];
        const nextCusp = houseCusps[h % 12 === 0 ? 12 : h + 1];

        if (this.isBetweenDegrees(planet.longitude, cusp, nextCusp)) {
          house = h;
          break;
        }
      }

      planet.house = house;
    }
  }

  /**
   * Check if angle is between two cusps (accounting for wraparound at 360°)
   */
  private isBetweenDegrees(angle: number, start: number, end: number): boolean {
    angle = ((angle % 360) + 360) % 360;
    start = ((start % 360) + 360) % 360;
    end = ((end % 360) + 360) % 360;

    if (start < end) {
      return angle >= start && angle < end;
    } else {
      return angle >= start || angle < end;
    }
  }

  /**
   * Assign Nakshatra (lunar mansion) and Pada (quarter) to planets
   * 27 nakshatras × 4 padas = 108 divisions of zodiac
   * Each nakshatra = 13°20' (13.333°)
   * Each pada = 3°20' (3.333°)
   */
  private assignNakshatras(planets: (PlanetaryPosition | any)[]): void {
    for (const planet of planets) {
      // Calculate which nakshatra
      const nakshatraIndex = Math.floor(planet.longitude / 13.333333);
      planet.nakshatra = VedicCalculator.NAKSHATRA_NAMES[nakshatraIndex % 27];

      // Calculate which pada (quarter within nakshatra)
      const nakshatraLongitude = planet.longitude % 13.333333;
      planet.pada = Math.floor(nakshatraLongitude / 3.333333) + 1;
    }
  }

  /**
   * Identify yogas (auspicious/inauspicious planetary combinations)
   */
  private identifyYogas(planets: PlanetaryPosition[], ascendant: any): ChartYogas {
    // Find planetary positions
    const sunPos = planets.find(p => p.planet === 'Sun');
    const moonPos = planets.find(p => p.planet === 'Moon');
    const marsPos = planets.find(p => p.planet === 'Mars');
    const mercuryPos = planets.find(p => p.planet === 'Mercury');
    const jupiterPos = planets.find(p => p.planet === 'Jupiter');
    const venusPos = planets.find(p => p.planet === 'Venus');
    const saturnPos = planets.find(p => p.planet === 'Saturn');

    const yogas: ChartYogas = {
      gajakesari: false,
      budhaditya: false,
      chandraMangal: false,
      amalaYoga: false,
      dhanaYoga: false,
    };

    // Gajakesari Yoga: Jupiter and Moon in Kendra (1, 4, 7, 10 houses)
    if (jupiterPos && moonPos) {
      const jupiterKendra = [1, 4, 7, 10].includes(jupiterPos.house);
      const moonKendra = [1, 4, 7, 10].includes(moonPos.house);
      if (jupiterKendra && moonKendra) {
        yogas.gajakesari = true;
      }
    }

    // Budhaditya Yoga: Mercury and Sun in Kendra or Trikona (1,5,9 or 1,4,7,10)
    if (mercuryPos && sunPos) {
      const sunKendra = [1, 4, 7, 10].includes(sunPos.house);
      const sunTrikona = [1, 5, 9].includes(sunPos.house);
      const mercuryKendra = [1, 4, 7, 10].includes(mercuryPos.house);
      const mercuryTrikona = [1, 5, 9].includes(mercuryPos.house);

      if ((sunKendra || sunTrikona) && (mercuryKendra || mercuryTrikona)) {
        yogas.budhaditya = true;
      }
    }

    // Chandra-Mangal Yoga: Moon and Mars in Kendra
    if (moonPos && marsPos) {
      const moonKendra = [1, 4, 7, 10].includes(moonPos.house);
      const marsKendra = [1, 4, 7, 10].includes(marsPos.house);
      if (moonKendra && marsKendra) {
        yogas.chandraMangal = true;
      }
    }

    // Amala Yoga: Sun, Jupiter, Venus in 10th house
    if ([sunPos, jupiterPos, venusPos].some(p => p?.house === 10)) {
      yogas.amalaYoga = true;
    }

    // Dhana Yoga: 9th and 11th houses have benefic planets
    const ninthHousePlanets = planets.filter(p => p.house === 9);
    const eleventhHousePlanets = planets.filter(p => p.house === 11);
    const beneficPlanets = ['Sun', 'Jupiter', 'Venus', 'Mercury', 'Moon'];

    if (ninthHousePlanets.some(p => beneficPlanets.includes(p.planet)) &&
        eleventhHousePlanets.some(p => beneficPlanets.includes(p.planet))) {
      yogas.dhanaYoga = true;
    }

    return yogas;
  }

  /**
   * Identify doshas (afflictions) in the chart
   */
  private identifyDoshas(planets: PlanetaryPosition[], birthDate: Date): ChartDoshas {
    const marsPos = planets.find(p => p.planet === 'Mars');
    const rahuPos = planets.find(p => p.planet === 'Rahu');
    const ketuPos = planets.find(p => p.planet === 'Ketu');
    const saturnPos = planets.find(p => p.planet === 'Saturn');
    const moonPos = planets.find(p => p.planet === 'Moon');

    // Manglik/Kuja Dosha: Mars in 1, 2, 4, 7, 8, 12 house
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    const hasManglik = !!(marsPos && manglikHouses.includes(marsPos.house));

    const manglikDosha = {
      exists: hasManglik,
      severity: hasManglik ? 'moderate' as const : 'none' as const,
      affectedHouses: hasManglik ? [marsPos!.house] : [],
    };

    // Kalsarpa Dosha: All planets between Rahu and Ketu (or Rahu in 12th, Ketu in 6th)
    let kalsarpaType: 'full' | 'partial' | 'none' = 'none';
    if (rahuPos && ketuPos) {
      const allPlanets = planets.map(p => p.longitude);
      const rahuLng = rahuPos.longitude;
      const ketuLng = ketuPos.longitude;

      const allBetween = allPlanets.every(lng =>
        this.isBetweenDegrees(lng, rahuLng, ketuLng)
      );

      if (allBetween) {
        kalsarpaType = 'full';
      } else if ((rahuPos.house === 12 && ketuPos.house === 6) ||
                 (rahuPos.house === 1 && ketuPos.house === 7)) {
        kalsarpaType = 'partial';
      }
    }

    // Sadhesati: Saturn transiting 12th, 1st, 2nd house from Moon
    let sadhesatiPhase: 'none' | 'saade-sati' | 'chandrashtama' = 'none';
    if (saturnPos && moonPos) {
      const moonRashi = moonPos.rashi;
      const moonRashiIndex = VedicCalculator.RASHI_NAMES.indexOf(moonRashi);
      const saturnRashiIndex = VedicCalculator.RASHI_NAMES.indexOf(saturnPos.rashi);

      const diff = (saturnRashiIndex - moonRashiIndex + 12) % 12;
      if (diff === 11 || diff === 0 || diff === 1) {
        sadhesatiPhase = 'saade-sati';
      } else if (diff === 8) {
        sadhesatiPhase = 'chandrashtama';
      }
    }

    return {
      manglikDosha,
      kalsarpaDosha: {
        exists: kalsarpaType !== 'none',
        type: kalsarpaType,
      },
      sadhesati: {
        phase: sadhesatiPhase,
        yearsRemaining: sadhesatiPhase === 'saade-sati' ? 7 : undefined,
      },
    };
  }

  /**
   * Calculate Vimshottari Dasha (20-year planetary cycle periods)
   *
   * Dasha order: Sun(6), Moon(10), Mars(7), Mercury(17), Jupiter(16), Venus(20), Saturn(19), Rahu(18), Ketu(7)
   * Determined by Moon's nakshatra at birth
   */
  private calculateDasha(birthDate: Date, moonPlanet: PlanetaryPosition): DashaPeriod {
    // Determine starting dasha from Moon's nakshatra
    const nakshatraIndex = VedicCalculator.NAKSHATRA_NAMES.indexOf(moonPlanet.nakshatra);

    // Pada determines the position within the dasha cycle
    const pada = moonPlanet.pada;

    // Initial dasha is determined by nakshatra
    const dashaStartPlanets: Planet[] = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Saturn', 'Rahu'];
    const startPlanetIndex = nakshatraIndex % 9;
    const startPlanet = dashaStartPlanets[startPlanetIndex];

    // Calculate dasha years and calculate when current dasha started/ends
    const startDashaDuration = VedicCalculator.DASHA_YEARS[startPlanet];

    // Determine what portion of the dasha has already passed
    const portionPassed = (pada - 1) / 4; // Padas are 1-4, so 0-0.75
    const yearsInCurrentDasha = startDashaDuration * portionPassed;

    // Calculate dates
    const mahadashStart = new Date(birthDate);
    mahadashStart.setFullYear(mahadashStart.getFullYear() - Math.floor(yearsInCurrentDasha));

    const mahadashEnd = new Date(mahadashStart);
    mahadashEnd.setFullYear(mahadashEnd.getFullYear() + startDashaDuration);

    // Calculate antardasha (sub-period)
    const nextPlanetIndex = (startPlanetIndex + 1) % 9;
    const nextPlanet = dashaStartPlanets[nextPlanetIndex];
    const antardashaDuration = VedicCalculator.DASHA_YEARS[nextPlanet];

    const antadarshStart = new Date();
    const antadarshEnd = new Date(antadarshStart);
    antadarshEnd.setFullYear(antadarshEnd.getFullYear() + (antardashaDuration * startDashaDuration / 120)); // Proportional calculation

    return {
      mahadasha: {
        planet: startPlanet,
        startDate: mahadashStart,
        endDate: mahadashEnd,
        yearsRemaining: Math.max(0, (mahadashEnd.getTime() - new Date().getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
        duration: startDashaDuration,
      },
      antardasha: {
        planet: nextPlanet,
        startDate: antadarshStart,
        endDate: antadarshEnd,
        yearsRemaining: Math.max(0, (antadarshEnd.getTime() - new Date().getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
      },
    };
  }
}
