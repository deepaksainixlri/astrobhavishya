/**
 * Geocoding Utility for Vedic Astrology
 *
 * Converts place names to coordinates and timezone information
 * using free geocoding APIs and caching for performance.
 */

/**
 * Geocoding result with location and timezone
 */
export interface GeocodingResult {
  placeName: string;
  latitude: number;
  longitude: number;
  timezone: number;
  country?: string;
  state?: string;
  formattedAddress?: string;
  source: 'cache' | 'api';
  timestamp: Date;
}

/**
 * Cached geocoding entry
 */
interface CacheEntry {
  result: GeocodingResult;
  timestamp: Date;
}

/**
 * Geocoding service configuration
 */
export interface GeocodingConfig {
  cacheMaxAge?: number; // milliseconds
  defaultApiTimeout?: number;
  useCache?: boolean;
}

/**
 * Vedic Astrology Geocoding Service
 */
export class GeocodingService {
  private cache: Map<string, CacheEntry> = new Map();
  private cacheMaxAge: number;
  private defaultApiTimeout: number;
  private useCache: boolean;

  // Timezone offset mappings (simplified - in production use proper timezone library)
  private timezoneOffsets: Record<string, number> = {
    // Major cities
    'london': 0, 'paris': 1, 'berlin': 1, 'moscow': 3,
    'dubai': 4, 'mumbai': 5.5, 'delhi': 5.5, 'bangalore': 5.5,
    'bangkok': 7, 'hong kong': 8, 'shanghai': 8, 'tokyo': 9,
    'sydney': 10, 'auckland': 12,
    'los angeles': -8, 'new york': -5, 'chicago': -6, 'denver': -7,
    'toronto': -5, 'mexico city': -6, 'sao paulo': -3, 'buenos aires': -3,
  };

  /**
   * Initialize geocoding service
   */
  constructor(config: GeocodingConfig = {}) {
    this.cacheMaxAge = config.cacheMaxAge || 30 * 24 * 60 * 60 * 1000; // 30 days
    this.defaultApiTimeout = config.defaultApiTimeout || 5000;
    this.useCache = config.useCache !== false;
  }

  /**
   * Get coordinates and timezone for a place name
   *
   * @param placeName Name of the location (e.g., "Mumbai, India")
   * @returns Geocoding result with latitude, longitude, and timezone
   */
  public async geocode(placeName: string): Promise<GeocodingResult> {
    const normalizedName = placeName.toLowerCase().trim();

    // Check cache first
    if (this.useCache) {
      const cached = this.getFromCache(normalizedName);
      if (cached) {
        return cached;
      }
    }

    // Try API
    try {
      const result = await this.geocodeViaAPI(placeName);
      if (result) {
        this.addToCache(normalizedName, result);
        return result;
      }
    } catch (error) {
      console.error('Geocoding API error:', error);
    }

    // Try hardcoded values for common places
    const hardcoded = this.getHardcodedLocation(normalizedName);
    if (hardcoded) {
      return hardcoded;
    }

    throw new Error(`Could not geocode location: ${placeName}`);
  }

  /**
   * Batch geocode multiple locations
   *
   * @param placeNames Array of place names
   * @returns Array of geocoding results
   */
  public async batchGeocode(placeNames: string[]): Promise<GeocodingResult[]> {
    const results: GeocodingResult[] = [];

    for (const placeName of placeNames) {
      try {
        const result = await this.geocode(placeName);
        results.push(result);
      } catch (error) {
        console.warn(`Failed to geocode: ${placeName}`, error);
      }
    }

    return results;
  }

  /**
   * Get location from cache
   */
  private getFromCache(normalizedName: string): GeocodingResult | null {
    const entry = this.cache.get(normalizedName);

    if (!entry) {
      return null;
    }

    // Check if cache entry has expired
    const age = Date.now() - entry.timestamp.getTime();
    if (age > this.cacheMaxAge) {
      this.cache.delete(normalizedName);
      return null;
    }

    return { ...entry.result, source: 'cache' as const };
  }

  /**
   * Add location to cache
   */
  private addToCache(normalizedName: string, result: GeocodingResult): void {
    if (this.useCache) {
      this.cache.set(normalizedName, {
        result: { ...result, source: 'api' as const },
        timestamp: new Date(),
      });
    }
  }

  /**
   * Geocode using OpenStreetMap Nominatim API (free, no API key required)
   */
  private async geocodeViaAPI(placeName: string): Promise<GeocodingResult | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json`,
        {
          headers: {
            'User-Agent': 'VedicAstroApp/1.0',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        return null;
      }

      const topResult = data[0];

      // Get timezone from latitude/longitude
      const timezone = await this.getTimezoneFromCoordinates(
        parseFloat(topResult.lat),
        parseFloat(topResult.lon)
      );

      return {
        placeName,
        latitude: parseFloat(topResult.lat),
        longitude: parseFloat(topResult.lon),
        timezone,
        country: topResult.address?.country || undefined,
        state: topResult.address?.state || undefined,
        formattedAddress: topResult.display_name || undefined,
        source: 'api',
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Nominatim API error:', error);
      return null;
    }
  }

  /**
   * Get timezone offset from latitude and longitude
   * Uses a simplified approach; for production, use a proper timezone library
   */
  private async getTimezoneFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<number> {
    try {
      // Use TimeZoneDB or similar API (free tier available)
      // For now, calculate approximate timezone from longitude
      // Each 15 degrees of longitude ≈ 1 hour of timezone offset
      const approximateTimezone = Math.round((longitude / 15) * 2) / 2;

      // Try to get more accurate timezone from an API
      const timezone = await this.fetchTimezoneFromAPI(latitude, longitude);
      return timezone || approximateTimezone;
    } catch (error) {
      // Fallback to longitude-based calculation
      return Math.round((longitude / 15) * 2) / 2;
    }
  }

  /**
   * Fetch timezone from API (e.g., TimeZoneDB)
   */
  private async fetchTimezoneFromAPI(latitude: number, longitude: number): Promise<number | null> {
    try {
      // Using free timezone API (note: limited requests without API key)
      const response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=free&format=json&by=position&lat=${latitude}&lng=${longitude}`,
        { signal: AbortSignal.timeout(this.defaultApiTimeout) }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (data.status !== 'OK' || !data.gmtOffset) {
        return null;
      }

      // Convert seconds to hours
      return data.gmtOffset / 3600;
    } catch (error) {
      console.warn('Timezone API error:', error);
      return null;
    }
  }

  /**
   * Get hardcoded location data for common places
   */
  private getHardcodedLocation(normalizedName: string): GeocodingResult | null {
    const locations: Record<string, Omit<GeocodingResult, 'source' | 'timestamp'>> = {
      // India
      'mumbai': {
        placeName: 'Mumbai, India',
        latitude: 19.0760,
        longitude: 72.8777,
        timezone: 5.5,
        country: 'India',
      },
      'delhi': {
        placeName: 'Delhi, India',
        latitude: 28.7041,
        longitude: 77.1025,
        timezone: 5.5,
        country: 'India',
      },
      'bangalore': {
        placeName: 'Bangalore, India',
        latitude: 12.9716,
        longitude: 77.5946,
        timezone: 5.5,
        country: 'India',
      },
      'kolkata': {
        placeName: 'Kolkata, India',
        latitude: 22.5726,
        longitude: 88.3639,
        timezone: 5.5,
        country: 'India',
      },
      'hyderabad': {
        placeName: 'Hyderabad, India',
        latitude: 17.3850,
        longitude: 78.4867,
        timezone: 5.5,
        country: 'India',
      },
      'varanasi': {
        placeName: 'Varanasi, India',
        latitude: 25.3176,
        longitude: 82.9989,
        timezone: 5.5,
        country: 'India',
      },
      'jaipur': {
        placeName: 'Jaipur, India',
        latitude: 26.9124,
        longitude: 75.7873,
        timezone: 5.5,
        country: 'India',
      },

      // United States
      'new york': {
        placeName: 'New York, USA',
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: -5,
        country: 'USA',
      },
      'los angeles': {
        placeName: 'Los Angeles, USA',
        latitude: 34.0522,
        longitude: -118.2437,
        timezone: -8,
        country: 'USA',
      },
      'chicago': {
        placeName: 'Chicago, USA',
        latitude: 41.8781,
        longitude: -87.6298,
        timezone: -6,
        country: 'USA',
      },
      'houston': {
        placeName: 'Houston, USA',
        latitude: 29.7604,
        longitude: -95.3698,
        timezone: -6,
        country: 'USA',
      },

      // Other major cities
      'london': {
        placeName: 'London, UK',
        latitude: 51.5074,
        longitude: -0.1278,
        timezone: 0,
        country: 'UK',
      },
      'paris': {
        placeName: 'Paris, France',
        latitude: 48.8566,
        longitude: 2.3522,
        timezone: 1,
        country: 'France',
      },
      'tokyo': {
        placeName: 'Tokyo, Japan',
        latitude: 35.6762,
        longitude: 139.6503,
        timezone: 9,
        country: 'Japan',
      },
      'sydney': {
        placeName: 'Sydney, Australia',
        latitude: -33.8688,
        longitude: 151.2093,
        timezone: 10,
        country: 'Australia',
      },
      'dubai': {
        placeName: 'Dubai, UAE',
        latitude: 25.2048,
        longitude: 55.2708,
        timezone: 4,
        country: 'UAE',
      },
      'bangkok': {
        placeName: 'Bangkok, Thailand',
        latitude: 13.7563,
        longitude: 100.5018,
        timezone: 7,
        country: 'Thailand',
      },
    };

    // Try exact match first
    if (locations[normalizedName]) {
      const result = locations[normalizedName];
      return {
        ...result,
        source: 'cache',
        timestamp: new Date(),
      };
    }

    // Try partial match
    for (const [key, value] of Object.entries(locations)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return {
          ...value,
          source: 'cache',
          timestamp: new Date(),
        };
      }
    }

    return null;
  }

  /**
   * Clear cache for a specific location
   */
  public clearCache(placeName?: string): void {
    if (placeName) {
      this.cache.delete(placeName.toLowerCase().trim());
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): {
    entries: number;
    maxAge: number;
  } {
    return {
      entries: this.cache.size,
      maxAge: this.cacheMaxAge,
    };
  }

  /**
   * Validate coordinates
   */
  public validateCoordinates(latitude: number, longitude: number): boolean {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  }

  /**
   * Calculate distance between two locations (in kilometers)
   * Using Haversine formula
   */
  public calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return parseFloat(distance.toFixed(2));
  }

  /**
   * Convert degrees to radians
   */
  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

/**
 * Factory function to create geocoding service
 */
export function createGeocodingService(config?: GeocodingConfig): GeocodingService {
  return new GeocodingService(config);
}
