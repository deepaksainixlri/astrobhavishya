'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { store } from '@/lib/store';

interface ReportSection {
  title: string;
  content: string;
}

interface Report {
  id: string;
  type: string;
  tier: string;
  createdAt: string;
  birthDetails: {
    fullName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  };
  sections: ReportSection[];
  model: string;
  tokenCount: number;
}

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!id) return;
    const data = store.getReport(id);
    setReport(data);
    setLoading(false);
    // Expand all sections by default
    if (data?.sections) {
      setExpandedSections(new Set(data.sections.map((_: ReportSection, i: number) => i)));
    }
  }, [id]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleDownload = () => {
    alert('PDF download coming soon');
  };

  const handleShare = () => {
    alert('Share feature coming soon');
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatReportType = (type: string) => {
    return type
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading report...</p>
        </div>
      </div>
    );
  }

  // --- Not found state ---
  if (!report) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">&#x1F52D;</div>
          <h2 className="text-2xl font-serif font-bold text-amber-400 mb-3">
            Report Not Found
          </h2>
          <p className="text-gray-400 mb-6">
            The report you are looking for does not exist or may have been removed from local storage.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-lg hover:bg-amber-400/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // --- Main report view ---
  return (
    <div className="min-h-screen bg-gray-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium rounded-full uppercase tracking-wider mb-3">
                {formatReportType(report.type)}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 mb-1">
                {report.birthDetails.fullName}
              </h1>
              <p className="text-gray-500 text-sm">
                Generated on {formatDate(report.createdAt)} &middot;{' '}
                <span className="capitalize">{report.tier}</span> Tier
              </p>
            </div>
          </div>

          {/* Birth details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Date of Birth</p>
              <p className="text-amber-400 font-semibold">{report.birthDetails.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Time of Birth</p>
              <p className="text-amber-400 font-semibold">{report.birthDetails.timeOfBirth}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Place of Birth</p>
              <p className="text-amber-400 font-semibold">{report.birthDetails.placeOfBirth}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-gray-800">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-lg hover:bg-amber-400/20 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Report sections */}
        <div className="space-y-4">
          {report.sections.map((section, idx) => {
            const isExpanded = expandedSections.has(idx);
            return (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-800/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-400">
                    <span className="text-purple-400 mr-2 text-sm font-sans">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 ml-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-5 pt-0">
                    <div className="border-t border-gray-800 pt-4">
                      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer metadata */}
        <div className="mt-8 text-center text-gray-600 text-xs space-y-1 pb-8">
          <p>Report ID: {report.id}</p>
          <p>
            Model: {report.model} &middot; Tokens used: {report.tokenCount?.toLocaleString() ?? 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
