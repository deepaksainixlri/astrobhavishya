'use client';

import React, { useState } from 'react';
import { Report } from '@/lib/types';
import { ShareButton } from '@/components/shared/ShareButton';

interface ReportViewProps {
  report: Report;
  isPremium?: boolean;
  onUnlock?: () => void;
}

interface Section {
  id: string;
  title: string;
  content: string;
  icon: string;
  isPremium?: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  isPremium = false,
  onUnlock,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['summary'])
  );

  const toggleSection = (sectionId: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(sectionId)) {
      newSet.delete(sectionId);
    } else {
      newSet.add(sectionId);
    }
    setExpandedSections(newSet);
  };

  const sections: Section[] = [
    {
      id: 'summary',
      title: 'Summary',
      content: report.summary,
      icon: '✨',
      isPremium: false,
    },
    {
      id: 'personality',
      title: 'Personality',
      content: report.personality,
      icon: '🌟',
      isPremium: false,
    },
    {
      id: 'career',
      title: 'Career',
      content: report.career,
      icon: '💼',
      isPremium: report.isPremium,
    },
    {
      id: 'relationships',
      title: 'Relationships',
      content: report.relationships,
      icon: '💕',
      isPremium: report.isPremium,
    },
    {
      id: 'health',
      title: 'Health',
      content: report.health,
      icon: '🏥',
      isPremium: report.isPremium,
    },
    {
      id: 'finance',
      title: 'Finance',
      content: report.finance,
      icon: '💰',
      isPremium: report.isPremium,
    },
    {
      id: 'currentPeriod',
      title: 'Current Period',
      content: report.currentPeriod,
      icon: '⏰',
      isPremium: false,
    },
    {
      id: 'remedies',
      title: 'Remedies',
      content: report.remedies,
      icon: '🔮',
      isPremium: report.isPremium,
    },
  ];

  const handleDownloadPDF = async () => {
    // Placeholder for PDF generation
    alert('PDF download feature coming soon!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-8 mb-8 border border-[#d4a574]/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#d4a574] mb-2">
              Your Astrology Report
            </h1>
            <p className="text-[#d4a574]/60 text-sm">
              Generated on {new Date(report.generatedAt).toLocaleDateString()}
            </p>
          </div>
          {report.isPremium && (
            <div className="px-4 py-2 bg-[#d4a574]/20 border border-[#d4a574] rounded-lg">
              <p className="text-[#d4a574] font-semibold text-sm">✨ Premium Report</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <ShareButton reportId={report.id} />
          {isPremium && (
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-[#d4a574] text-[#0a0a1a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#d4a574]/50 transition-all"
            >
              📥 Download PDF
            </button>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const isLocked = section.isPremium && !isPremium;

          return (
            <div
              key={section.id}
              className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-xl border border-[#d4a574]/20 overflow-hidden transition-all hover:border-[#d4a574]/40"
            >
              {/* Section Header */}
              <button
                onClick={() => !isLocked && toggleSection(section.id)}
                disabled={isLocked}
                className="w-full p-6 flex items-center justify-between hover:bg-[#2d1b69]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#d4a574] flex items-center gap-2">
                      {section.title}
                      {section.isPremium && !isPremium && (
                        <span className="text-xs bg-[#d4a574]/20 text-[#d4a574] px-2 py-1 rounded">
                          Premium
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                {!isLocked && (
                  <span className="text-[#d4a574] text-xl">
                    {isExpanded ? '−' : '+'}
                  </span>
                )}
              </button>

              {/* Section Content */}
              {isExpanded && !isLocked && (
                <div className="px-6 pb-6 border-t border-[#d4a574]/20 pt-4">
                  <p className="text-[#d4a574]/80 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              )}

              {/* Locked Overlay */}
              {isLocked && (
                <div className="p-6 border-t border-[#d4a574]/20 bg-gradient-to-br from-[#0a0a1a]/50 to-[#1a0a2e]/50 flex flex-col items-center justify-center py-12">
                  <p className="text-[#d4a574]/60 text-center mb-4">
                    This premium section is locked
                  </p>
                  {onUnlock && (
                    <button
                      onClick={onUnlock}
                      className="px-4 py-2 bg-[#d4a574] text-[#0a0a1a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#d4a574]/50 transition-all"
                    >
                      🔓 Unlock Premium
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-[#d4a574]/20 text-center">
        <p className="text-[#d4a574]/60 text-sm mb-4">
          Report generated in {report.generationTime}ms using AI-powered Vedic astrology analysis
        </p>
        <p className="text-[#d4a574]/40 text-xs">
          Disclaimer: This report is for entertainment purposes. Always consult with professional astrologers for important life decisions.
        </p>
      </div>
    </div>
  );
};
