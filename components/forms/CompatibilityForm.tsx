'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BirthDetails } from '@/lib/types';

interface CompatibilityFormProps {
  onSubmit: (person1: BirthDetails, person2: BirthDetails) => Promise<void>;
  isLoading?: boolean;
}

interface PlaceSuggestion {
  name: string;
  lat: number;
  lon: number;
}

interface PersonFormData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  amPm: string;
  placeOfBirth: string;
  gender: string;
  unknownBirthTime: boolean;
}

const initialPersonData: PersonFormData = {
  name: '',
  dateOfBirth: '',
  timeOfBirth: '',
  amPm: 'AM',
  placeOfBirth: '',
  gender: '',
  unknownBirthTime: false,
};

export const CompatibilityForm: React.FC<CompatibilityFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [person1, setPerson1] = useState<PersonFormData>(initialPersonData);
  const [person2, setPerson2] = useState<PersonFormData>(initialPersonData);
  const [suggestions1, setSuggestions1] = useState<PlaceSuggestion[]>([]);
  const [suggestions2, setSuggestions2] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const [searching1, setSearching1] = useState(false);
  const [searching2, setSearching2] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const suggestionsRef1 = useRef<HTMLDivElement>(null);
  const suggestionsRef2 = useRef<HTMLDivElement>(null);
  const debounceTimer1 = useRef<NodeJS.Timeout>(undefined);
  const debounceTimer2 = useRef<NodeJS.Timeout>(undefined);

  // Debounced geocoding for person 1
  useEffect(() => {
    if (debounceTimer1.current) clearTimeout(debounceTimer1.current);
    if (person1.placeOfBirth.length > 2) {
      setSearching1(true);
      debounceTimer1.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              person1.placeOfBirth
            )}&format=json&limit=5`
          );
          const data = await response.json();
          setSuggestions1(
            data.map((item: any) => ({
              name: item.display_name.split(',')[0],
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
            }))
          );
          setShowSuggestions1(true);
        } catch (error) {
          console.error('Geocoding error:', error);
        } finally {
          setSearching1(false);
        }
      }, 300);
    } else {
      setSuggestions1([]);
      setShowSuggestions1(false);
    }
    return () => {
      if (debounceTimer1.current) clearTimeout(debounceTimer1.current);
    };
  }, [person1.placeOfBirth]);

  // Debounced geocoding for person 2
  useEffect(() => {
    if (debounceTimer2.current) clearTimeout(debounceTimer2.current);
    if (person2.placeOfBirth.length > 2) {
      setSearching2(true);
      debounceTimer2.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              person2.placeOfBirth
            )}&format=json&limit=5`
          );
          const data = await response.json();
          setSuggestions2(
            data.map((item: any) => ({
              name: item.display_name.split(',')[0],
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
            }))
          );
          setShowSuggestions2(true);
        } catch (error) {
          console.error('Geocoding error:', error);
        } finally {
          setSearching2(false);
        }
      }, 300);
    } else {
      setSuggestions2([]);
      setShowSuggestions2(false);
    }
    return () => {
      if (debounceTimer2.current) clearTimeout(debounceTimer2.current);
    };
  }, [person2.placeOfBirth]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef1.current &&
        !suggestionsRef1.current.contains(event.target as Node)
      ) {
        setShowSuggestions1(false);
      }
      if (
        suggestionsRef2.current &&
        !suggestionsRef2.current.contains(event.target as Node)
      ) {
        setShowSuggestions2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate person 1
    if (!person1.name.trim()) newErrors['person1_name'] = 'Name is required';
    if (!person1.dateOfBirth) newErrors['person1_dob'] = 'Date is required';
    if (!person1.unknownBirthTime && !person1.timeOfBirth)
      newErrors['person1_time'] = 'Time is required';
    if (!person1.placeOfBirth.trim())
      newErrors['person1_place'] = 'Place is required';

    // Validate person 2
    if (!person2.name.trim()) newErrors['person2_name'] = 'Name is required';
    if (!person2.dateOfBirth) newErrors['person2_dob'] = 'Date is required';
    if (!person2.unknownBirthTime && !person2.timeOfBirth)
      newErrors['person2_time'] = 'Time is required';
    if (!person2.placeOfBirth.trim())
      newErrors['person2_place'] = 'Place is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonChange = (
    personNum: 1 | 2,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const key = `person${personNum}_${name}`;
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }

    if (personNum === 1) {
      setPerson1((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    } else {
      setPerson2((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSuggestionClick = (
    personNum: 1 | 2,
    suggestion: PlaceSuggestion
  ) => {
    if (personNum === 1) {
      setPerson1((prev) => ({ ...prev, placeOfBirth: suggestion.name }));
      setShowSuggestions1(false);
    } else {
      setPerson2((prev) => ({ ...prev, placeOfBirth: suggestion.name }));
      setShowSuggestions2(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const convertTime = (time: string, amPm: string): string => {
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours);

        if (amPm === 'PM' && hour !== 12) {
          hour += 12;
        } else if (amPm === 'AM' && hour === 0) {
          hour = 12;
        }

        return `${hour.toString().padStart(2, '0')}:${minutes}`;
      };

      const birthDetails1: BirthDetails = {
        name: person1.name,
        dateOfBirth: person1.dateOfBirth,
        timeOfBirth: person1.unknownBirthTime
          ? '06:00'
          : convertTime(person1.timeOfBirth, person1.amPm),
        placeOfBirth: person1.placeOfBirth,
        latitude: 0,
        longitude: 0,
        timezone: 'UTC',
        gender: (person1.gender as 'male' | 'female' | 'other') || undefined,
        unknownBirthTime: person1.unknownBirthTime,
      };

      const birthDetails2: BirthDetails = {
        name: person2.name,
        dateOfBirth: person2.dateOfBirth,
        timeOfBirth: person2.unknownBirthTime
          ? '06:00'
          : convertTime(person2.timeOfBirth, person2.amPm),
        placeOfBirth: person2.placeOfBirth,
        latitude: 0,
        longitude: 0,
        timezone: 'UTC',
        gender: (person2.gender as 'male' | 'female' | 'other') || undefined,
        unknownBirthTime: person2.unknownBirthTime,
      };

      await onSubmit(birthDetails1, birthDetails2);
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    }
  };

  const PersonInput = ({
    personNum,
    data,
    suggestions,
    showSuggestions,
    isSearching,
    suggestionsRef,
  }: {
    personNum: 1 | 2;
    data: PersonFormData;
    suggestions: PlaceSuggestion[];
    showSuggestions: boolean;
    isSearching: boolean;
    suggestionsRef: React.RefObject<HTMLDivElement | null>;
  }) => {
    const errorPrefix = `person${personNum}_`;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#d4a574]">
          Person {personNum}'s Details
        </h3>

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => handlePersonChange(personNum, e)}
            placeholder=" "
            className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all peer ${
              errors[`${errorPrefix}name`]
                ? 'border-red-500'
                : 'border-[#d4a574]/30 focus:border-[#d4a574]'
            } focus:outline-none`}
          />
          <label className="absolute left-4 top-3.5 text-[#d4a574]/60 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#d4a574] transition-all pointer-events-none">
            Full Name
          </label>
          {errors[`${errorPrefix}name`] && (
            <p className="text-red-400 text-xs mt-1">
              {errors[`${errorPrefix}name`]}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[#d4a574]/60 text-sm mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={data.dateOfBirth}
            onChange={(e) => handlePersonChange(personNum, e)}
            className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all ${
              errors[`${errorPrefix}dob`]
                ? 'border-red-500'
                : 'border-[#d4a574]/30 focus:border-[#d4a574]'
            } focus:outline-none`}
          />
          {errors[`${errorPrefix}dob`] && (
            <p className="text-red-400 text-xs mt-1">
              {errors[`${errorPrefix}dob`]}
            </p>
          )}
        </div>

        {/* Time of Birth */}
        {!data.unknownBirthTime && (
          <div>
            <label className="block text-[#d4a574]/60 text-sm mb-2">
              Time of Birth
            </label>
            <div className="flex gap-3">
              <input
                type="time"
                name="timeOfBirth"
                value={data.timeOfBirth}
                onChange={(e) => handlePersonChange(personNum, e)}
                className={`flex-1 px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all ${
                  errors[`${errorPrefix}time`]
                    ? 'border-red-500'
                    : 'border-[#d4a574]/30 focus:border-[#d4a574]'
                } focus:outline-none`}
              />
              <select
                name="amPm"
                value={data.amPm}
                onChange={(e) => handlePersonChange(personNum, e)}
                className="px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 border-[#d4a574]/30 focus:border-[#d4a574]"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            {errors[`${errorPrefix}time`] && (
              <p className="text-red-400 text-xs mt-1">
                {errors[`${errorPrefix}time`]}
              </p>
            )}
          </div>
        )}

        {/* Unknown Birth Time */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id={`unknownBirthTime${personNum}`}
            name="unknownBirthTime"
            checked={data.unknownBirthTime}
            onChange={(e) => handlePersonChange(personNum, e)}
            className="w-5 h-5 accent-[#d4a574]"
          />
          <label
            htmlFor={`unknownBirthTime${personNum}`}
            className="text-[#d4a574]/80 text-sm cursor-pointer"
          >
            I don't know the exact birth time
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
              value={data.placeOfBirth}
              onChange={(e) => handlePersonChange(personNum, e)}
              onFocus={() => data.placeOfBirth.length > 0 && (personNum === 1 ? setShowSuggestions1(true) : setShowSuggestions2(true))}
              placeholder="City, Country"
              className={`w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 transition-all ${
                errors[`${errorPrefix}place`]
                  ? 'border-red-500'
                  : 'border-[#d4a574]/30 focus:border-[#d4a574]'
              } focus:outline-none`}
            />
            {isSearching && (
              <div className="absolute right-3 top-3 text-[#d4a574] animate-spin">
                ⚡
              </div>
            )}
          </div>

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a1a] border border-[#d4a574]/30 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    handleSuggestionClick(personNum, suggestion)
                  }
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

          {errors[`${errorPrefix}place`] && (
            <p className="text-red-400 text-xs mt-1">
              {errors[`${errorPrefix}place`]}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[#d4a574]/60 text-sm mb-2">
            Gender (Optional)
          </label>
          <select
            name="gender"
            value={data.gender}
            onChange={(e) => handlePersonChange(personNum, e)}
            className="w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 border-[#d4a574]/30 focus:border-[#d4a574]"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#16213e] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl shadow-2xl p-8 border border-[#d4a574]/20">
          <h1 className="text-3xl font-bold text-[#d4a574] mb-2 text-center">
            Compatibility Check
          </h1>
          <p className="text-center text-[#d4a574]/60 mb-8 text-sm">
            Explore your astrological compatibility
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Person 1 */}
              <PersonInput
                personNum={1}
                data={person1}
                suggestions={suggestions1}
                showSuggestions={showSuggestions1}
                isSearching={searching1}
                suggestionsRef={suggestionsRef1}
              />

              {/* Person 2 */}
              <PersonInput
                personNum={2}
                data={person2}
                suggestions={suggestions2}
                showSuggestions={showSuggestions2}
                isSearching={searching2}
                suggestionsRef={suggestionsRef2}
              />
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
                  Calculating Compatibility...
                </>
              ) : (
                'Check Compatibility'
              )}
            </button>
          </form>

          <p className="text-center text-[#d4a574]/40 text-xs mt-6">
            Your information is private and never shared.
          </p>
        </div>
      </div>
    </div>
  );
};
