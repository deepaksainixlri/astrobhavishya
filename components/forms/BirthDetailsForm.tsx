'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BirthDetails } from '@/lib/types';

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => Promise<void>;
  isLoading?: boolean;
}

interface PlaceSuggestion {
  name: string;
  lat: number;
  lon: number;
}

export const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    amPm: 'AM',
    placeOfBirth: '',
    gender: '',
    unknownBirthTime: false,
  });

  const [placeSuggestions, setPlaceSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Debounced place search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (formData.placeOfBirth.length > 2) {
      setIsSearching(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              formData.placeOfBirth
            )}&format=json&limit=5`
          );
          const data = await response.json();
          setPlaceSuggestions(
            data.map((item: any) => ({
              name: item.display_name.split(',')[0],
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
            }))
          );
          setShowSuggestions(true);
        } catch (error) {
          console.error('Geocoding error:', error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setPlaceSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [formData.placeOfBirth]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.unknownBirthTime && !formData.timeOfBirth)
      newErrors.timeOfBirth = 'Time of birth is required';
    if (!formData.placeOfBirth.trim())
      newErrors.placeOfBirth = 'Place of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePlaceSuggestionClick = (suggestion: PlaceSuggestion) => {
    setFormData((prev) => ({
      ...prev,
      placeOfBirth: suggestion.name,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let timeOfBirth = formData.timeOfBirth;
      if (formData.unknownBirthTime) {
        timeOfBirth = '06:00';
      } else if (formData.amPm === 'PM' && !timeOfBirth.startsWith('12')) {
        const [hours, minutes] = timeOfBirth.split(':');
        timeOfBirth = `${parseInt(hours) + 12}:${minutes}`;
      } else if (formData.amPm === 'AM' && timeOfBirth.startsWith('12')) {
        const [, minutes] = timeOfBirth.split(':');
        timeOfBirth = `00:${minutes}`;
      }

      const birthDetails: BirthDetails = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        timeOfBirth: timeOfBirth,
        placeOfBirth: formData.placeOfBirth,
        latitude: 0,
        longitude: 0,
        timezone: 'UTC',
        gender:
          (formData.gender as 'male' | 'female' | 'other') || undefined,
        unknownBirthTime: formData.unknownBirthTime,
      };

      await onSubmit(birthDetails);
    } catch (error) {
      setErrors({
        submit: 'Failed to submit form. Please try again.',
      });
    }
  };

  const formatTimeDisplay = (time: string, amPm: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    let displayHour = hour;

    if (amPm === 'PM' && hour !== 12) {
      displayHour = hour - 12;
    } else if (amPm === 'AM' && hour === 0) {
      displayHour = 12;
    }

    return `${displayHour.toString().padStart(2, '0')}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#16213e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl shadow-2xl p-8 border border-[#d4a574]/20">
          <h1 className="text-3xl font-bold text-[#d4a574] mb-2 text-center">
            AstroBhavishya
          </h1>
          <p className="text-center text-[#d4a574]/60 mb-8 text-sm">
            Create Your Vedic Birth Chart
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder=" "
                className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all peer ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-[#d4a574]/30 focus:border-[#d4a574]'
                } focus:outline-none`}
              />
              <label className="absolute left-4 top-3.5 text-[#d4a574]/60 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#d4a574] transition-all pointer-events-none">
                Full Name
              </label>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all ${
                  errors.dateOfBirth
                    ? 'border-red-500'
                    : 'border-[#d4a574]/30 focus:border-[#d4a574]'
                } focus:outline-none`}
              />
              <label className="block text-[#d4a574]/60 text-sm mb-2">
                Date of Birth
              </label>
              {errors.dateOfBirth && (
                <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Time of Birth */}
            {!formData.unknownBirthTime && (
              <div className="relative">
                <label className="block text-[#d4a574]/60 text-sm mb-2">
                  Time of Birth
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all ${
                        errors.timeOfBirth
                          ? 'border-red-500'
                          : 'border-[#d4a574]/30 focus:border-[#d4a574]'
                      } focus:outline-none`}
                    />
                  </div>
                  <select
                    name="amPm"
                    value={formData.amPm}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 border-[#d4a574]/30 focus:border-[#d4a574] focus:outline-none"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
                {errors.timeOfBirth && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.timeOfBirth}
                  </p>
                )}
              </div>
            )}

            {/* Unknown Birth Time Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="unknownBirthTime"
                name="unknownBirthTime"
                checked={formData.unknownBirthTime}
                onChange={handleInputChange}
                className="w-5 h-5 accent-[#d4a574]"
              />
              <label
                htmlFor="unknownBirthTime"
                className="text-[#d4a574]/80 text-sm cursor-pointer"
              >
                I don't know my exact birth time (defaults to sunrise)
              </label>
            </div>

            {/* Place of Birth */}
            <div className="relative" ref={suggestionsRef}>
              <label className="block text-[#d4a574]/60 text-sm mb-2">
                Place of Birth
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  onFocus={() =>
                    formData.placeOfBirth.length > 0 &&
                    setShowSuggestions(true)
                  }
                  placeholder="City, Country"
                  className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all ${
                    errors.placeOfBirth
                      ? 'border-red-500'
                      : 'border-[#d4a574]/30 focus:border-[#d4a574]'
                  } focus:outline-none`}
                />
                {isSearching && (
                  <div className="absolute right-3 top-3 text-[#d4a574]">
                    <div className="animate-spin">⚡</div>
                  </div>
                )}
              </div>

              {/* Place Suggestions */}
              {showSuggestions && placeSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a1a] border border-[#d4a574]/30 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {placeSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePlaceSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left text-white hover:bg-[#7c3aed]/20 border-b border-[#d4a574]/10 last:border-b-0 transition-colors"
                    >
                      <div className="text-sm font-medium">{suggestion.name}</div>
                      <div className="text-xs text-[#d4a574]/60">
                        {suggestion.lat.toFixed(2)}, {suggestion.lon.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {errors.placeOfBirth && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.placeOfBirth}
                </p>
              )}
            </div>

            {/* Gender Selection */}
            <div className="relative">
              <label className="block text-[#d4a574]/60 text-sm mb-2">
                Gender (Optional)
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 border-[#d4a574]/30 focus:border-[#d4a574] focus:outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#d4a574] to-[#c9915c] text-[#0a0a1a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4a574]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin">⚡</div>
                  Calculating Chart...
                </>
              ) : (
                'Create Your Birth Chart'
              )}
            </button>
          </form>

          <p className="text-center text-[#d4a574]/40 text-xs mt-6">
            Your birth details are securely encrypted and never shared.
          </p>
        </div>
      </div>
    </div>
  );
};
