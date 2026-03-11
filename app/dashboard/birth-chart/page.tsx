'use client';

import React, { useState } from 'react';
import { store } from '@/lib/store';
import { GeocodingService } from '@/lib/astrology/geocoding';
import {
  Star, MapPin, Calendar, Clock, User as UserIcon,
  Sparkles, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';

const geocoder = new GeocodingService();

export default function BirthChartPage() {
  const [birthData, setBirthData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '12:00',
    placeOfBirth: '',
    gender: 'male',
  });
  const [generating, setGenerating] = useState(false);
  const [chartResult, setChartResult] = useState<any>(null);
  const [reportResult, setReportResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('planets');

  const validateBirthDate = (date: string): boolean => {
    const birthDate = new Date(date);
    const today = new Date();
    if (birthDate > today) {
      setError('Birth date cannot be in the future');
      return false;
    }
    if (birthDate.getFullYear() < 1900) {
      setError('Birth date must be after 1900');
      return false;
    }
    return true;
  };

  const handleGenerate = async () => {
    if (!birthData.dateOfBirth || !birthData.placeOfBirth) {
      setError('Please fill in date and place of birth');
      return;
    }
    if (!validateBirthDate(birthData.dateOfBirth)) return;

    setGenerating(true);
    setError('');
    setChartResult(null);
    setReportResult(null);

    try {
      setStatus('Geocoding location...');
      const location = await geocoder.geocode(birthData.placeOfBirth);
      setStatus(`Found: ${location.formattedAddress || location.placeName} (${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)})`);

      setStatus('Calculating planetary positions...');
      const chartRes = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...birthData,
          latitude: location.latitude,
          longitude: location.longitude,
          timezone: location.timezone,
        }),
      });

      const chartData = await chartRes.json();
      if (!chartData.success) throw new Error(chartData.error);
      setChartResult(chartData.chart);
      store.saveChart(chartData.chart);

      setStatus('Generating AI analysis...');
      const reportRes = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chartData: chartData.chart,
          reportType: 'kundli',
          tier: 'basic',
        }),
      });

      const reportData = await reportRes.json();
      if (reportData.success) {
        setReportResult(reportData.report);
        store.saveReport(reportData.report);
      }

      setStatus('');
    } catch (err: any) {
      setError(err.message || 'Failed to generate chart');
      setStatus('');
    } finally {
      setGenerating(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Star className="w-8 h-8 text-amber-400" />
          Birth Chart (Kundli)
        </h1>
        <p className="text-gray-400 mt-2">
          Generate your complete Vedic birth chart with AI-powered analysis
        </p>
      </div>

      {/* Birth Details Form */}
      {!chartResult && (
        <div className="bg-gradient-to-br from-gray-900 to-purple-900/20 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            Enter Birth Details
          </h2>

          {error && (
            <div className="mb-6 flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {status && (
            <div className="mb-6 flex items-center gap-2 bg-amber-900/30 border border-amber-500/30 text-amber-300 px-4 py-3 rounded-xl text-sm">
              <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" />
              {status}
            </div>
          )}

          <div className="space-y-5 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5" /> Full Name
                </label>
                <input
                  type="text"
                  value={birthData.name}
                  onChange={(e) => setBirthData({ ...birthData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Gender</label>
                <select
                  value={birthData.gender}
                  onChange={(e) => setBirthData({ ...birthData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date of Birth *
                </label>
                <input
                  type="date"
                  value={birthData.dateOfBirth}
                  onChange={(e) => setBirthData({ ...birthData, dateOfBirth: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Time of Birth
                </label>
                <input
                  type="time"
                  value={birthData.timeOfBirth}
                  onChange={(e) => setBirthData({ ...birthData, timeOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Place of Birth *
              </label>
              <input
                type="text"
                value={birthData.placeOfBirth}
                onChange={(e) => setBirthData({ ...birthData, placeOfBirth: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                placeholder="e.g., Mumbai, India"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Coordinates will be automatically detected from the place name</p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !birthData.dateOfBirth || !birthData.placeOfBirth}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-amber-500/25 flex items-center gap-2"
            >
              {generating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Birth Chart
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Chart Results */}
      {chartResult && (
        <div className="space-y-6">
          {/* Summary Header */}
          <div className="bg-gradient-to-r from-gray-900 to-purple-900/30 border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-amber-400">
                  {birthData.name || 'Birth Chart'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {birthData.dateOfBirth} at {birthData.timeOfBirth} &bull; {birthData.placeOfBirth}
                </p>
              </div>
              <div className="text-5xl">
                {getZodiacEmoji(chartResult.ascendant?.rashi)}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <InfoCard label="Ascendant (Lagna)" value={chartResult.ascendant?.rashi} />
              <InfoCard
                label="Moon Sign (Rashi)"
                value={chartResult.planets?.find((p: any) => p.planet === 'Moon')?.rashi || 'N/A'}
              />
              <InfoCard
                label="Sun Sign"
                value={chartResult.planets?.find((p: any) => p.planet === 'Sun')?.rashi || 'N/A'}
              />
              <InfoCard
                label="Nakshatra"
                value={chartResult.planets?.find((p: any) => p.planet === 'Moon')?.nakshatra || 'N/A'}
              />
            </div>
          </div>

          {/* Planetary Positions */}
          <CollapsibleSection
            title="Planetary Positions (Graha Sthiti)"
            icon="🪐"
            isOpen={expandedSection === 'planets'}
            onToggle={() => toggleSection('planets')}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Planet</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Sign (Rashi)</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Degree</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">House</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Nakshatra</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Pada</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {chartResult.planets?.map((planet: any) => (
                    <tr key={planet.planet} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-amber-400 font-medium">{planet.planet}</td>
                      <td className="py-3 px-4 text-white">{planet.rashi}</td>
                      <td className="py-3 px-4 text-gray-300">{planet.rashiDegree?.toFixed(1)}&deg;</td>
                      <td className="py-3 px-4 text-gray-300">H{planet.house}</td>
                      <td className="py-3 px-4 text-gray-300">{planet.nakshatra}</td>
                      <td className="py-3 px-4 text-gray-300">{planet.pada}</td>
                      <td className="py-3 px-4">
                        {planet.isRetrograde ? (
                          <span className="px-2 py-0.5 bg-red-900/30 text-red-300 text-xs rounded">Retrograde</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-green-900/30 text-green-300 text-xs rounded">Direct</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>

          {/* Yogas */}
          <CollapsibleSection
            title="Yogas (Auspicious Combinations)"
            icon="✨"
            isOpen={expandedSection === 'yogas'}
            onToggle={() => toggleSection('yogas')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <YogaCard name="Gajakesari Yoga" active={chartResult.yogas?.gajakesari} description="Jupiter-Moon conjunction/aspect. Brings wisdom, wealth and fame." />
              <YogaCard name="Budhaditya Yoga" active={chartResult.yogas?.budhaditya} description="Sun-Mercury conjunction. Enhances intelligence and communication." />
              <YogaCard name="Chandra-Mangal Yoga" active={chartResult.yogas?.chandraMangal} description="Moon-Mars conjunction. Gives financial prosperity and courage." />
              <YogaCard name="Amala Yoga" active={chartResult.yogas?.amalaYoga} description="Benefic in 10th from Moon/Ascendant. Brings good reputation." />
              <YogaCard name="Dhana Yoga" active={chartResult.yogas?.dhanaYoga} description="Wealth combination. Indicates financial prosperity and abundance." />
            </div>
          </CollapsibleSection>

          {/* Doshas */}
          <CollapsibleSection
            title="Doshas (Afflictions)"
            icon="⚠️"
            isOpen={expandedSection === 'doshas'}
            onToggle={() => toggleSection('doshas')}
          >
            <div className="space-y-4">
              <DoshaCard
                name="Manglik Dosha"
                exists={chartResult.doshas?.manglikDosha?.exists}
                severity={chartResult.doshas?.manglikDosha?.severity}
                description="Mars placement affecting marriage. Remedies available."
              />
              <DoshaCard
                name="Kalsarpa Dosha"
                exists={chartResult.doshas?.kalsarpaDosha?.exists}
                type={chartResult.doshas?.kalsarpaDosha?.type}
                description="All planets between Rahu-Ketu axis. Can cause challenges."
              />
              <DoshaCard
                name="Sade Sati"
                exists={chartResult.doshas?.sadhesati?.phase !== 'none'}
                phase={chartResult.doshas?.sadhesati?.phase}
                description="Saturn's 7.5 year transit over Moon sign. A period of transformation."
              />
            </div>
          </CollapsibleSection>

          {/* Dasha */}
          {chartResult.dasha && (
            <CollapsibleSection
              title="Vimshottari Dasha (Planetary Periods)"
              icon="🕐"
              isOpen={expandedSection === 'dasha'}
              onToggle={() => toggleSection('dasha')}
            >
              <div className="space-y-3">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Current Mahadasha</p>
                  <p className="text-xl font-bold text-amber-400">{chartResult.dasha.mahadasha?.planet}</p>
                  {chartResult.dasha.mahadasha?.startDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(chartResult.dasha.mahadasha.startDate).toLocaleDateString()} - {new Date(chartResult.dasha.mahadasha.endDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {chartResult.dasha.antardasha && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Current Antardasha</p>
                    <p className="text-lg font-bold text-purple-400">{chartResult.dasha.antardasha?.planet}</p>
                  </div>
                )}
              </div>
            </CollapsibleSection>
          )}

          {/* AI Report */}
          {reportResult && (
            <div className="bg-gradient-to-br from-gray-900 to-purple-900/20 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-amber-400 mb-2">
                {reportResult.title || 'AI Vedic Analysis'}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{reportResult.summary}</p>
              <div className="space-y-6">
                {reportResult.sections?.map((section: any, i: number) => (
                  <div key={i} className="border-l-2 border-amber-500/30 pl-4">
                    <h4 className="font-semibold text-white mb-2">{section.title}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setChartResult(null);
              setReportResult(null);
              setError('');
            }}
            className="px-6 py-2.5 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-500/50 rounded-lg text-sm transition-colors"
          >
            Generate Another Chart
          </button>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function CollapsibleSection({
  title, icon, isOpen, onToggle, children,
}: {
  title: string; icon: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 hover:bg-gray-800/50 transition-colors">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-xl">{icon}</span> {title}
        </h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

function YogaCard({ name, active, description }: { name: string; active: boolean; description: string }) {
  return (
    <div className={`rounded-lg p-4 border ${active ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-800/30 border-gray-700'}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-sm font-semibold ${active ? 'text-green-300' : 'text-gray-500'}`}>{name}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${active ? 'bg-green-900/40 text-green-300' : 'bg-gray-800 text-gray-500'}`}>
          {active ? 'Present' : 'Not Present'}
        </span>
      </div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}

function DoshaCard({ name, exists, severity, type, phase, description }: {
  name: string; exists: boolean; severity?: string; type?: string; phase?: string; description: string;
}) {
  return (
    <div className={`rounded-lg p-4 border ${exists ? 'bg-red-900/20 border-red-500/30' : 'bg-gray-800/30 border-gray-700'}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`font-semibold ${exists ? 'text-red-300' : 'text-gray-400'}`}>{name}</span>
        {exists ? (
          <span className="px-2 py-0.5 text-xs rounded bg-red-900/40 text-red-300">
            {severity || type || phase || 'Present'}
          </span>
        ) : (
          <span className="px-2 py-0.5 text-xs rounded bg-gray-800 text-gray-500">Not Present</span>
        )}
      </div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}

function getZodiacEmoji(sign: string): string {
  const emojis: Record<string, string> = {
    Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋', Leo: '♌', Virgo: '♍',
    Libra: '♎', Scorpio: '♏', Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
  };
  return emojis[sign] || '⭐';
}
