/**
 * Local storage-based data store for demo mode.
 * In production, this is replaced by Supabase queries.
 */

const KEYS = {
  reports: 'astro_reports',
  charts: 'astro_charts',
  horoscopes: 'astro_horoscopes',
  payments: 'astro_payments',
};

function getItem<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function setItem<T>(key: string, data: T[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

export const store = {
  // Reports
  getReports: () => getItem<any>(KEYS.reports),
  saveReport: (report: any) => {
    const reports = getItem<any>(KEYS.reports);
    reports.unshift(report);
    setItem(KEYS.reports, reports);
    return report;
  },
  getReport: (id: string) => {
    return getItem<any>(KEYS.reports).find((r: any) => r.id === id) || null;
  },

  // Charts
  getCharts: () => getItem<any>(KEYS.charts),
  saveChart: (chart: any) => {
    const charts = getItem<any>(KEYS.charts);
    charts.unshift(chart);
    setItem(KEYS.charts, charts);
    return chart;
  },
  getChart: (id: string) => {
    return getItem<any>(KEYS.charts).find((c: any) => c.id === id) || null;
  },

  // Horoscopes
  getHoroscope: (sign: string, date: string) => {
    const horoscopes = getItem<any>(KEYS.horoscopes);
    return horoscopes.find((h: any) => h.sign === sign && h.date === date) || null;
  },
  saveHoroscopes: (horoscopes: any[]) => {
    const existing = getItem<any>(KEYS.horoscopes);
    // Keep only last 7 days
    const recent = [...horoscopes, ...existing].slice(0, 12 * 7);
    setItem(KEYS.horoscopes, recent);
  },

  // Payments
  savePayment: (payment: any) => {
    const payments = getItem<any>(KEYS.payments);
    payments.unshift(payment);
    setItem(KEYS.payments, payments);
  },
  getPayments: () => getItem<any>(KEYS.payments),
};
