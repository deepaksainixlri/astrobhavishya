'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { store } from '@/lib/store';
import {
  Star, Plus, FileText, Heart, Sun, TrendingUp,
  Clock, ChevronRight, Sparkles, MapPin
} from 'lucide-react';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [showBirthForm, setShowBirthForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [birthData, setBirthData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '12:00',
    placeOfBirth: '',
    gender: 'male',
  });
  const [chartResult, setChartResult] = useState<any>(null);
  const [reportResult, setReportResult] = useState<any>(null);

  useEffect(() => {
    setReports(store.getReports());
  }, []);

  const handleGenerateChart = async () => {
    if (!birthData.dateOfBirth || !birthData.placeOfBirth) return;
    setGenerating(true);
    setChartResult(null);
    setReportResult(null);

    try {
      // Step 1: Generate chart
      const chartRes = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...birthData,
          latitude: 28.6139, // Default - in production, use geocoding
          longitude: 77.209,
          timezone: 5.5,
        }),
      });

      const chartData = await chartRes.json();
      if (!chartData.success) throw new Error(chartData.error);

      setChartResult(chartData.chart);
      store.saveChart(chartData.chart);

      // Step 2: Generate AI report
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
        setReports(store.getReports());
      }
    } catch (error: any) {
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const quickStats = [
    { label: 'Reports Generated', value: reports.length, icon: FileText, color: 'text-blue-400' },
    { label: 'Credits Remaining', value: profile?.credits || 0, icon: Star, color: 'text-amber-400' },
    { label: 'Subscription', value: (profile?.subscription || 'Free'), icon: TrendingUp, color: 'text-green-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome, {profile?.fullName || user?.email?.split('@')[0] || 'Explorer'}
        </h1>
        <p className="text-gray-400 mt-1">Explore your cosmic blueprint and unlock celestial insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2 capitalize">{String(stat.value)}</p>
          </div>
        ))}
      </div>

      {/* Generate Birth Chart */}
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/20 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Generate Your Kundli Report
            </h2>
            <p className="text-sm text-gray-400 mt-1">Enter birth details for a personalized AI-powered Vedic astrology report</p>
          </div>
        </div>

        {!showBirthForm && !chartResult ? (
          <button
            onClick={() => setShowBirthForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/25"
          >
            <Plus className="w-5 h-5" />
            Enter Birth Details
          </button>
        ) : showBirthForm && !chartResult ? (
          <div className="space-y-4 max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={birthData.name}
                  onChange={(e) => setBirthData({ ...birthData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Gender</label>
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
                <label className="block text-sm text-gray-300 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={birthData.dateOfBirth}
                  onChange={(e) => setBirthData({ ...birthData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Time of Birth</label>
                <input
                  type="time"
                  value={birthData.timeOfBirth}
                  onChange={(e) => setBirthData({ ...birthData, timeOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Place of Birth *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={birthData.placeOfBirth}
                  onChange={(e) => setBirthData({ ...birthData, placeOfBirth: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50"
                  placeholder="e.g., New Delhi, India"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleGenerateChart}
                disabled={generating || !birthData.dateOfBirth || !birthData.placeOfBirth}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-amber-500/25"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Kundli'
                )}
              </button>
              <button
                onClick={() => setShowBirthForm(false)}
                className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {/* Chart Result */}
        {chartResult && (
          <div className="mt-6 space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-4">Birth Chart Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-gray-400">Ascendant</span>
                  <p className="text-white font-medium">{chartResult.ascendant?.rashi}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Moon Sign</span>
                  <p className="text-white font-medium">
                    {chartResult.planets?.find((p: any) => p.planet === 'Moon')?.rashi || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Sun Sign</span>
                  <p className="text-white font-medium">
                    {chartResult.planets?.find((p: any) => p.planet === 'Sun')?.rashi || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Mahadasha</span>
                  <p className="text-white font-medium">{chartResult.dasha?.mahadasha?.planet}</p>
                </div>
              </div>

              {/* Planetary Positions */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Planetary Positions</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {chartResult.planets?.map((planet: any) => (
                    <div key={planet.planet} className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-amber-400 font-medium">{planet.planet}</p>
                      <p className="text-sm text-white">{planet.rashi}</p>
                      <p className="text-xs text-gray-500">H{planet.house} {planet.isRetrograde ? '(R)' : ''}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yogas & Doshas */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Yogas Identified</h4>
                  <div className="space-y-1">
                    {chartResult.yogas?.gajakesari && <span className="inline-block px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded mr-2">Gajakesari</span>}
                    {chartResult.yogas?.budhaditya && <span className="inline-block px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded mr-2">Budhaditya</span>}
                    {chartResult.yogas?.chandraMangal && <span className="inline-block px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded mr-2">Chandra-Mangal</span>}
                    {chartResult.yogas?.amalaYoga && <span className="inline-block px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded mr-2">Amala</span>}
                    {chartResult.yogas?.dhanaYoga && <span className="inline-block px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded mr-2">Dhana</span>}
                    {!Object.values(chartResult.yogas || {}).some(Boolean) && <span className="text-xs text-gray-500">None detected</span>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Doshas</h4>
                  <div className="space-y-1">
                    {chartResult.doshas?.manglikDosha?.exists && (
                      <span className="inline-block px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded mr-2">
                        Manglik ({chartResult.doshas.manglikDosha.severity})
                      </span>
                    )}
                    {chartResult.doshas?.kalsarpaDosha?.exists && (
                      <span className="inline-block px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded mr-2">
                        Kalsarpa ({chartResult.doshas.kalsarpaDosha.type})
                      </span>
                    )}
                    {chartResult.doshas?.sadhesati?.phase !== 'none' && (
                      <span className="inline-block px-2 py-1 bg-yellow-900/30 text-yellow-300 text-xs rounded mr-2">
                        {chartResult.doshas?.sadhesati?.phase}
                      </span>
                    )}
                    {!chartResult.doshas?.manglikDosha?.exists && !chartResult.doshas?.kalsarpaDosha?.exists && chartResult.doshas?.sadhesati?.phase === 'none' && (
                      <span className="text-xs text-gray-500">No significant doshas</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Report */}
            {reportResult && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-4">
                  {reportResult.title || 'Your Vedic Astrology Report'}
                </h3>
                <p className="text-sm text-gray-400 mb-6">{reportResult.summary}</p>

                <div className="space-y-6">
                  {reportResult.sections?.map((section: any, i: number) => (
                    <div key={i} className="border-l-2 border-amber-500/30 pl-4">
                      <h4 className="text-md font-semibold text-white mb-2">{section.title}</h4>
                      <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setChartResult(null);
                setReportResult(null);
                setShowBirthForm(true);
              }}
              className="px-4 py-2 text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              Generate Another Report
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/horoscope" className="group bg-gray-900/50 border border-gray-800 hover:border-amber-500/30 rounded-xl p-5 transition-all">
          <Sun className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">Daily Horoscope</h3>
          <p className="text-sm text-gray-400 mt-1">Check today&apos;s cosmic guidance</p>
        </Link>
        <Link href="/compatibility" className="group bg-gray-900/50 border border-gray-800 hover:border-pink-500/30 rounded-xl p-5 transition-all">
          <Heart className="w-8 h-8 text-pink-400 mb-3" />
          <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors">Compatibility Check</h3>
          <p className="text-sm text-gray-400 mt-1">Find your cosmic match</p>
        </Link>
        <Link href="/pricing" className="group bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 rounded-xl p-5 transition-all">
          <Star className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">Premium Reports</h3>
          <p className="text-sm text-gray-400 mt-1">Unlock deep insights</p>
        </Link>
      </div>

      {/* Recent Reports */}
      {reports.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {reports.slice(0, 5).map((report: any) => (
              <div key={report.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{report.title || 'Kundli Report'}</p>
                    <p className="text-xs text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/report/${report.id}`}
                  className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1"
                >
                  View <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
