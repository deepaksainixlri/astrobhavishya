'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BirthChart } from '@/components/charts/BirthChart';
import { DashaTimeline } from '@/components/charts/DashaTimeline';

export default function DashboardPage() {
  const [chartData, setChartData] = useState<any>(null);
  const [horoscope, setHoroscope] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">✨</div>
          <p className="text-saffron">Loading your astrological profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-warm-cream to-light-peach rounded-2xl p-8 border border-saffron/20 shadow-warm">
        <h1 className="text-4xl font-bold text-saffron mb-2">
          Welcome, Astro Seeker!
        </h1>
        {chartData && (
          <p className="text-body-brown text-lg mb-6">
            You are currently in {chartData?.dashaInfo?.mahadashaLord} Mahadasha
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/kundli">
            <button className="w-full px-6 py-3 bg-saffron text-dark-brown font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/50 transition-all">
              📊 Create New Kundli
            </button>
          </Link>
          <Link href="/compatibility">
            <button className="w-full px-6 py-3 bg-terracotta text-white font-bold rounded-lg hover:shadow-lg hover:shadow-terracotta/50 transition-all">
              💕 Check Compatibility
            </button>
          </Link>
          <Link href="/horoscope">
            <button className="w-full px-6 py-3 bg-saffron/20 text-saffron font-bold rounded-lg border border-saffron hover:bg-saffron/30 transition-all">
              🌟 Today's Horoscope
            </button>
          </Link>
        </div>
      </div>

      {/* Credits & Subscription Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-warm-cream to-light-peach rounded-2xl p-6 border border-saffron/20 shadow-warm">
          <h3 className="text-saffron font-bold mb-4">Available Credits</h3>
          <div className="flex items-end gap-4">
            <div className="text-4xl font-bold text-saffron">{userCredits}</div>
            <p className="text-body-brown text-sm mb-1">credits</p>
          </div>
          <Link href="/pricing">
            <button className="mt-4 px-4 py-2 bg-saffron/20 text-saffron rounded-lg border border-saffron hover:bg-saffron/30 transition-colors text-sm font-medium">
              Buy More Credits
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-warm-cream to-light-peach rounded-2xl p-6 border border-saffron/20 shadow-warm">
          <h3 className="text-saffron font-bold mb-4">Subscription Status</h3>
          <div className="mb-4">
            <p className="text-saffron font-bold mb-1">
              {subscription?.plan === 'premium' ? 'Premium' : subscription?.plan === 'pro' ? 'Pro' : 'Free'}
            </p>
            <p className="text-body-brown text-sm">
              {subscription?.expiresAt
                ? `Expires: ${new Date(subscription.expiresAt).toLocaleDateString()}`
                : 'Upgrade to get exclusive features'}
            </p>
          </div>
          <Link href="/pricing">
            <button className="px-4 py-2 bg-saffron text-dark-brown rounded-lg hover:shadow-lg hover:shadow-saffron/50 transition-all text-sm font-medium">
              View Plans
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-gradient-to-br from-warm-cream to-light-peach rounded-2xl p-8 border border-saffron/20 shadow-warm">
        <h2 className="text-2xl font-bold text-saffron mb-6">
          Recent Reports
        </h2>
        <p className="text-body-brown mb-4">
          You haven't generated any reports yet.
        </p>
        <Link href="/dashboard/kundli">
          <button className="px-6 py-3 bg-saffron text-dark-brown font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/50 transition-all">
            Create Your First Report
          </button>
        </Link>
      </div>
    </div>
  );
}
