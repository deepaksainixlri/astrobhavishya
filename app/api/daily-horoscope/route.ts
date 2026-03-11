import { NextRequest, NextResponse } from 'next/server';
import { generateDailyHoroscopes } from '@/lib/ai/openrouter';

// In-memory cache for daily horoscopes
let horoscopeCache: { date: string; data: any[] } | null = null;

const FALLBACK_HOROSCOPES: Record<string, any> = {
  aries: { sign: 'Aries', generalForecast: 'A dynamic day awaits you, Aries. Your natural leadership qualities shine bright today. Mars energizes your ambitions, pushing you toward bold decisions. Trust your instincts and take the initiative in both personal and professional matters.', love: 'Venus brings warmth to your relationships. Express your feelings openly to strengthen bonds with loved ones.', career: 'Jupiter favors new beginnings. A business proposal or career opportunity may present itself. Act decisively.', health: 'Channel your excess energy through physical activity. Morning exercise sets a positive tone.', luckyNumber: 9, luckyColor: 'Red', overallScore: 8, loveScore: 7, careerScore: 8, healthScore: 7 },
  taurus: { sign: 'Taurus', generalForecast: 'Stability and comfort are your themes today, Taurus. Venus brings a sense of calm and satisfaction. Focus on building lasting foundations in your relationships and finances. Your practical nature serves you well in making important decisions.', love: 'Romance blooms in familiar settings. A quiet dinner or shared activity strengthens your connection.', career: 'Financial matters look favorable. Your steady approach to work earns recognition from superiors.', health: 'Pay attention to your throat and neck area. Warm beverages and gentle stretching help.', luckyNumber: 6, luckyColor: 'Green', overallScore: 7, loveScore: 8, careerScore: 7, healthScore: 6 },
  gemini: { sign: 'Gemini', generalForecast: 'Communication flows freely today, Gemini. Mercury sharpens your wit and social skills. Multiple conversations and connections lead to interesting opportunities. Your adaptability helps you navigate changing situations with ease.', love: 'Intellectual connection deepens with your partner. Share ideas and dreams for exciting conversations.', career: 'Networking opens doors. A casual conversation could lead to a significant professional opportunity.', health: 'Mental stimulation is high. Balance it with breathing exercises and short walks.', luckyNumber: 5, luckyColor: 'Yellow', overallScore: 8, loveScore: 7, careerScore: 9, healthScore: 7 },
  cancer: { sign: 'Cancer', generalForecast: 'Emotional depth characterizes your day, Cancer. The Moon enhances your intuition and nurturing instincts. Home and family matters take center stage. Your empathetic nature helps resolve a friend or family member\'s concern.', love: 'Deep emotional conversations strengthen your bond. Show vulnerability to invite intimacy.', career: 'Creative projects flourish. Your intuition guides you to the right business decisions.', health: 'Emotional well-being is key. Spend time near water or in nature for rejuvenation.', luckyNumber: 2, luckyColor: 'White', overallScore: 7, loveScore: 9, careerScore: 6, healthScore: 7 },
  leo: { sign: 'Leo', generalForecast: 'Your radiance attracts positive attention today, Leo. The Sun amplifies your natural charisma and confidence. Creative expression brings joy and recognition. Step into the spotlight and share your talents with the world.', love: 'Your warm personality draws admirers. Express your affection generously and watch love flourish.', career: 'Leadership opportunities arise. Your confidence and vision inspire your team and colleagues.', health: 'Your vitality is high. Engage in activities that bring joy and keep your heart healthy.', luckyNumber: 1, luckyColor: 'Gold', overallScore: 9, loveScore: 8, careerScore: 9, healthScore: 8 },
  virgo: { sign: 'Virgo', generalForecast: 'Precision and organization guide your day, Virgo. Mercury enhances your analytical abilities. Details that others miss become clear to you. Use this heightened awareness to improve systems and processes around you.', love: 'Show love through acts of service. Small gestures of care speak louder than grand declarations.', career: 'Your attention to detail solves a persistent problem. Colleagues appreciate your thoroughness.', health: 'Focus on digestive health. Include fiber-rich foods and stay hydrated throughout the day.', luckyNumber: 5, luckyColor: 'Navy Blue', overallScore: 7, loveScore: 6, careerScore: 8, healthScore: 7 },
  libra: { sign: 'Libra', generalForecast: 'Harmony and balance define your day, Libra. Venus enhances your diplomatic skills and aesthetic sense. Partnerships thrive under today\'s energy. Your ability to see both sides of a situation helps resolve conflicts.', love: 'Romance and beauty surround you. Plan something aesthetically pleasing for your partner.', career: 'Collaborative projects succeed. Your mediation skills resolve a workplace disagreement.', health: 'Seek balance in all things. Yoga and meditation help maintain your inner equilibrium.', luckyNumber: 6, luckyColor: 'Pink', overallScore: 8, loveScore: 9, careerScore: 7, healthScore: 7 },
  scorpio: { sign: 'Scorpio', generalForecast: 'Transformation energy is powerful today, Scorpio. Pluto deepens your insight and determination. Hidden truths may surface, bringing clarity to complex situations. Your resilience helps you navigate any challenges with strength.', love: 'Intensity deepens your connections. Trust and vulnerability create powerful bonds.', career: 'Research and investigation yield breakthroughs. Your persistence pays off in a pending matter.', health: 'Release emotional tension through journaling or meditation. Deep breathing calms intensity.', luckyNumber: 4, luckyColor: 'Maroon', overallScore: 7, loveScore: 8, careerScore: 8, healthScore: 6 },
  sagittarius: { sign: 'Sagittarius', generalForecast: 'Adventure and optimism fill your day, Sagittarius. Jupiter expands your horizons and fuels your wanderlust. Learning opportunities abound, whether through travel, study, or philosophical discussions. Embrace the unknown.', love: 'Shared adventures strengthen relationships. Plan something exciting and spontaneous.', career: 'International connections or higher education bring opportunities. Think big and aim high.', health: 'Outdoor activities boost your energy. Hiking or exploring nature refreshes your spirit.', luckyNumber: 3, luckyColor: 'Purple', overallScore: 8, loveScore: 7, careerScore: 8, healthScore: 8 },
  capricorn: { sign: 'Capricorn', generalForecast: 'Discipline and ambition drive your day, Capricorn. Saturn rewards your consistent efforts with tangible results. Long-term goals come into sharper focus. Your patient, methodical approach to challenges proves highly effective.', love: 'Steady commitment shows strength. Practical expressions of love build lasting trust.', career: 'Authority figures take notice of your work ethic. A promotion or recognition may be near.', health: 'Pay attention to joints and bones. Consistent stretching and proper posture help.', luckyNumber: 8, luckyColor: 'Dark Green', overallScore: 7, loveScore: 6, careerScore: 9, healthScore: 6 },
  aquarius: { sign: 'Aquarius', generalForecast: 'Innovation and humanitarian ideals inspire your day, Aquarius. Uranus sparks creative solutions to old problems. Your unique perspective is valued by those around you. Technology and social causes offer rewarding engagement.', love: 'Friendship forms the foundation of love. Intellectual connection and shared ideals matter most.', career: 'Technology and innovation open new paths. Your unconventional ideas gain unexpected support.', health: 'Circulation and nervous system need attention. Mindfulness and regular movement help.', luckyNumber: 7, luckyColor: 'Electric Blue', overallScore: 8, loveScore: 7, careerScore: 8, healthScore: 7 },
  pisces: { sign: 'Pisces', generalForecast: 'Creativity and spiritual connection define your day, Pisces. Neptune enhances your imagination and compassion. Artistic pursuits and spiritual practices bring deep fulfillment. Your empathetic nature helps someone in need.', love: 'Romantic dreams may manifest. Your compassionate nature deepens emotional connections.', career: 'Creative fields flourish. Trust your intuition in financial and business decisions.', health: 'Water therapy and meditation restore your energy. Protect your emotional boundaries.', luckyNumber: 3, luckyColor: 'Sea Green', overallScore: 7, loveScore: 8, careerScore: 7, healthScore: 7 },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sign = (searchParams.get('sign') || 'aries').toLowerCase();
    const today = new Date().toISOString().split('T')[0];

    // Check cache
    if (horoscopeCache && horoscopeCache.date === today) {
      const cached = horoscopeCache.data.find(
        (h: any) => h.sign.toLowerCase() === sign
      );
      if (cached) {
        return NextResponse.json({ success: true, horoscope: cached, date: today });
      }
    }

    // Try AI generation
    try {
      const aiResponse = await generateDailyHoroscopes(new Date());
      const parsed = JSON.parse(
        aiResponse.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      );

      if (Array.isArray(parsed) && parsed.length >= 12) {
        horoscopeCache = { date: today, data: parsed };
        const signData = parsed.find((h: any) => h.sign.toLowerCase() === sign);
        if (signData) {
          return NextResponse.json({ success: true, horoscope: signData, date: today });
        }
      }
    } catch (aiError) {
      console.error('AI horoscope generation failed, using fallback:', aiError);
    }

    // Fallback to static horoscopes
    const fallback = FALLBACK_HOROSCOPES[sign] || FALLBACK_HOROSCOPES.aries;
    return NextResponse.json({ success: true, horoscope: { ...fallback, date: today }, date: today });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get horoscope', details: error.message },
      { status: 500 }
    );
  }
}
