'use client';

import { useState } from 'react';
import { Download, Share2, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReportContent({ id }: { id: string }) {
  const [report] = useState({
    id: id || 'demo-report-123',
    title: 'Birth Chart Analysis Report',
    name: 'John Doe',
    dateOfBirth: 'January 15, 1990',
    timeOfBirth: '10:30 AM',
    placeOfBirth: 'Mumbai, India',
    generatedDate: new Date().toLocaleDateString(),
    sections: [
      {
        title: 'Ascendant & Overall Personality',
        content: 'Your Ascendant is Sagittarius, which gives you a philosophical and adventurous nature. People born with Sagittarius ascendant are usually optimistic, enthusiastic, and have a natural inclination towards knowledge and spiritual growth.',
      },
      {
        title: 'Sun Sign Interpretation',
        content: 'With the Sun in Gemini, you possess excellent communication skills and intellectual prowess. Geminis are known for their adaptability, curiosity, and ability to multitask. Your mental agility allows you to grasp concepts quickly and articulate your thoughts effectively.',
      },
      {
        title: 'Moon Sign & Emotional Nature',
        content: 'Your Moon in Libra indicates a balanced emotional nature with an appreciation for harmony and beauty. You seek peace and are skilled at seeing both sides of any situation. This placement suggests you value relationships and find emotional satisfaction through balanced connections.',
      },
      {
        title: 'Planetary Positions & Their Effects',
        content: 'Your Mars is strongly placed in the 10th house, indicating strong drive and ambition in your career. Venus in your 5th house suggests talents in creative pursuits and favorable conditions for romantic relationships. Jupiter in your 2nd house indicates prosperity and financial growth.',
      },
      {
        title: 'Dasha Periods & Upcoming Transitions',
        content: 'You are currently in Jupiter Dasha, which is a favorable period for expansion and growth. This period will bring opportunities for advancement in career and personal life. Expect increased confidence and positive developments in the next 2-3 years.',
      },
      {
        title: 'Yogas & Doshas',
        content: 'You have Gajkesari Yoga, which indicates strength, wealth, and success. This yoga brings prosperity and good reputation. However, you have mild Mangal Dosha which can be addressed through remedial measures.',
      },
      {
        title: 'Remedial Measures',
        content: 'Chant "Om Angarakaya Namaha" regularly to mitigate Mangal Dosha effects. Wearing a Red Coral gemstone is recommended. Perform Hanuman Chalisa recitation every Friday to enhance positive planetary influences.',
      },
      {
        title: 'Career Guidance',
        content: 'With your current planetary placements, careers in communication, travel, finance, and technology are highly favorable. Your strong 10th house indicates success in leadership roles. This is an excellent time to pursue higher goals and seek promotions.',
      },
    ],
  });

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-astro-gold hover:text-astro-gold_light mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="card-gold">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-astro-gold mb-2">
                  {report.title}
                </h1>
                <p className="text-gray-300 text-lg">{report.name}</p>
              </div>
              <span className="px-3 py-1 bg-astro-gold/20 border border-astro-gold rounded-full text-sm text-astro-gold">
                Generated on {report.generatedDate}
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6 pt-6 border-t border-astro-gold/30">
              <div>
                <p className="text-gray-400 text-sm mb-1">Date of Birth</p>
                <p className="text-astro-gold font-semibold">{report.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Time of Birth</p>
                <p className="text-astro-gold font-semibold">{report.timeOfBirth}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Place of Birth</p>
                <p className="text-astro-gold font-semibold">{report.placeOfBirth}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Report ID</p>
                <p className="text-astro-gold font-semibold text-sm">{report.id}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-astro-gold/30">
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="btn-outline flex items-center gap-2 ml-auto">
                <MessageCircle className="w-4 h-4" />
                Consult
              </button>
            </div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="space-y-6">
          {report.sections.map((section, idx) => (
            <div key={idx} className="card">
              <h2 className="text-2xl font-serif font-bold text-astro-gold mb-4">
                {section.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Consultation CTA */}
        <div className="card-gold mt-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-astro-gold mb-3">
            Need More Detailed Insights?
          </h3>
          <p className="text-gray-200 mb-6">
            Book a consultation with our expert astrologers for personalized guidance and remedial solutions.
          </p>
          <button className="btn-secondary">
            Book Expert Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
