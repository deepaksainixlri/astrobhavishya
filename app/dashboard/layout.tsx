'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { label: 'Create Kundli', href: '/dashboard/kundli', icon: '📊' },
    { label: 'Compatibility', href: '/compatibility', icon: '💕' },
    { label: 'Daily Horoscope', href: '/horoscope', icon: '🌟' },
    { label: 'My Reports', href: '/dashboard/reports', icon: '📄' },
    { label: 'Pricing', href: '/pricing', icon: '💎' },
    { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-warm-ivory via-white to-warm-cream">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-warm-cream to-light-peach border-r border-saffron/15 transition-all duration-300 flex flex-col shadow-warm`}>
        <div className="p-6 border-b border-saffron/15">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-saffron-light to-saffron rounded-lg flex items-center justify-center text-warm-ivory font-bold">
              ✦
            </div>
            {sidebarOpen && <span className="font-serif font-bold text-saffron">AstroBhavishya</span>}
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-saffron/80 hover:bg-saffron/10 hover:text-saffron transition-colors"
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-saffron/15 space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600/80 hover:bg-red-100/30 hover:text-red-700 transition-colors">
            <span className="text-lg flex-shrink-0">🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-saffron/80 hover:bg-saffron/10 transition-colors"
          >
            <span className="text-lg">«</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
