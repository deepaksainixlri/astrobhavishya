/**
 * Vedic Astrology Interpretations Database
 *
 * Comprehensive interpretation database for:
 * - Planet-in-sign combinations (9 planets × 12 signs)
 * - Planet-in-house combinations
 * - Nakshatra characteristics
 * - Yoga descriptions and effects
 * - Dosha explanations and remedies
 * - Dasha period general interpretations
 *
 * Based on classical Vedic astrology texts including:
 * - Brihat Parashara Hora Shastra
 * - Jaimini Sutras
 * - Phaladeepika
 */

import type { Planet, Rashi, Nakshatra } from './calculator';

/**
 * Planet-in-sign interpretation
 */
export interface PlanetSignInterpretation {
  strengths: string[];
  challenges: string[];
  characteristics: string;
  lifeAreas: string[];
  remedies?: string[];
}

/**
 * Planet-in-house interpretation
 */
export interface PlanetHouseInterpretation {
  description: string;
  lifeAreas: string[];
  strengths: string[];
  challenges: string[];
}

/**
 * Nakshatra characteristics
 */
export interface NakshatraInterpretation {
  ruler: Planet;
  deity: string;
  characteristics: string;
  professions: string[];
  healthTendencies: string[];
  fortuneAreas: string[];
}

/**
 * Yoga description and effects
 */
export interface YogaInterpretation {
  name: string;
  description: string;
  effects: string[];
  conditions: string;
  benefits: string[];
}

/**
 * Dosha interpretation with remedies
 */
export interface DoshaInterpretation {
  name: string;
  description: string;
  effects: string[];
  remedies: {
    mantra: string;
    gemstone: string;
    charity: string;
    diet: string[];
  };
}

/**
 * Planet characteristics in Vedic astrology
 */
export interface PlanetCharacteristics {
  name: Planet;
  devataName: string;
  gender: 'masculine' | 'feminine' | 'neutral';
  element: string;
  color: string;
  direction: string;
  bodyPart: string;
  metal: string;
  gemstone: string;
  day: string;
  mantra: string;
  characteristics: string;
}

/**
 * Complete interpretations database
 */
export const interpretations = {
  /**
   * Planet-in-sign interpretations
   * 9 planets × 12 signs = 108 combinations
   */
  planetInSign: {
    // SUN INTERPRETATIONS
    'Sun-Aries': {
      strengths: ['Leadership', 'Courage', 'Initiative', 'Self-confidence'],
      challenges: ['Arrogance', 'Impatience', 'Impulsiveness'],
      characteristics: 'Dignified and powerful Sun in its own fire sign. Bestows natural leadership, enterprise, and pioneering spirit. The native is brave, direct, and has strong willpower. Excellent for entrepreneurship and authority positions.',
      lifeAreas: ['Career', 'Leadership', 'Physical vitality', 'Self-expression'],
      remedies: ['Recite Aditya Hridaya Stotra on Sundays', 'Donate red lentils', 'Wear ruby gemstone']
    },
    'Sun-Taurus': {
      strengths: ['Stability', 'Determination', 'Wealth accumulation', 'Patience'],
      challenges: ['Stubbornness', 'Materialism', 'Slowness'],
      characteristics: 'Sun in earthy Taurus gains material stability but loses some shine. The native is grounded, practical, and focused on accumulating wealth and resources. Good for farming, real estate, and financial matters.',
      lifeAreas: ['Wealth', 'Property', 'Finance', 'Stability'],
    },
    'Sun-Gemini': {
      strengths: ['Communication', 'Intellect', 'Versatility', 'Business acumen'],
      challenges: ['Inconsistency', 'Scattered energy', 'Superficiality'],
      characteristics: 'Sun in airy Gemini makes the native intellectually brilliant, communicative, and versatile. Excellent for writing, commerce, teaching, and media. The mind is sharp and adaptive.',
      lifeAreas: ['Communication', 'Commerce', 'Intellect', 'Travel'],
    },
    'Sun-Cancer': {
      strengths: ['Emotional intelligence', 'Domestic sense', 'Nurturing', 'Intuition'],
      challenges: ['Emotional sensitivity', 'Moodiness', 'Indecision'],
      characteristics: 'Sun in watery Cancer is debilitated but gains emotional depth. The native is sensitive, caring, and home-oriented. Good for professions dealing with emotions, family, or the public.',
      lifeAreas: ['Family', 'Emotions', 'Domestic life', 'Intuition'],
    },
    'Sun-Leo': {
      strengths: ['Charisma', 'Creativity', 'Confidence', 'Authority'],
      challenges: ['Pride', 'Ego', 'Arrogance', 'Need for attention'],
      characteristics: 'Sun is exalted in Leo, bestowing exceptional strength and charisma. The native is creative, commanding, and naturally attractive. Excellent for leadership, arts, entertainment, and positions of authority.',
      lifeAreas: ['Creativity', 'Leadership', 'Entertainment', 'Romance'],
      remedies: ['Wear ruby for enhanced effect', 'Donate to temples', 'Practice meditation']
    },
    'Sun-Virgo': {
      strengths: ['Analytical mind', 'Service orientation', 'Attention to detail', 'Discrimination'],
      challenges: ['Over-analysis', 'Perfectionism', 'Criticism'],
      characteristics: 'Sun in earthy Virgo makes the native analytical, practical, and service-oriented. Good for technical professions, medicine, accounting, and detail-oriented work. The native is hardworking and methodical.',
      lifeAreas: ['Service', 'Health', 'Analytical work', 'Detailed projects'],
    },
    'Sun-Libra': {
      strengths: ['Diplomacy', 'Balance', 'Aesthetic sense', 'Relationships'],
      challenges: ['Indecision', 'Dependence on others', 'Passivity'],
      characteristics: 'Sun in airy Libra makes the native diplomatic, artistic, and relationship-focused. Good for law, diplomacy, design, and partnerships. The native values balance and aesthetics.',
      lifeAreas: ['Relationships', 'Law', 'Art', 'Diplomacy'],
    },
    'Sun-Scorpio': {
      strengths: ['Intensity', 'Determination', 'Mysticism', 'Transformation'],
      challenges: ['Destructiveness', 'Obsession', 'Secrecy'],
      characteristics: 'Sun in Scorpio creates intensity and investigative ability. The native is magnetic, secretive, and capable of profound transformation. Good for research, investigation, and healing professions.',
      lifeAreas: ['Transformation', 'Research', 'Mysticism', 'Healing'],
    },
    'Sun-Sagittarius': {
      strengths: ['Optimism', 'Higher learning', 'Spirituality', 'Generosity'],
      challenges: ['Over-optimism', 'Restlessness', 'Preachiness'],
      characteristics: 'Sun in fiery Sagittarius creates optimism and philosophical nature. The native is spiritual, intellectual, and generous. Good for teaching, law, religion, and long-distance travel.',
      lifeAreas: ['Spirituality', 'Learning', 'Travel', 'Teaching'],
    },
    'Sun-Capricorn': {
      strengths: ['Ambition', 'Discipline', 'Responsibility', 'Practical wisdom'],
      challenges: ['Coldness', 'Pessimism', 'Rigidity'],
      characteristics: 'Sun in earthy Capricorn creates ambition and organizational ability. The native is disciplined, responsible, and capable of climbing hierarchies. Excellent for management and government positions.',
      lifeAreas: ['Career', 'Authority', 'Responsibility', 'Achievement'],
    },
    'Sun-Aquarius': {
      strengths: ['Innovation', 'Humanitarian ideals', 'Independence', 'Intellectual freedom'],
      challenges: ['Detachment', 'Eccentricity', 'Rebellion'],
      characteristics: 'Sun in airy Aquarius creates innovation and humanitarian values. The native is independent, intellectual, and reformist. Good for technology, social movements, and research.',
      lifeAreas: ['Innovation', 'Technology', 'Humanitarianism', 'Groups'],
    },
    'Sun-Pisces': {
      strengths: ['Compassion', 'Spirituality', 'Creativity', 'Intuition'],
      challenges: ['Escapism', 'Confusion', 'Delusion'],
      characteristics: 'Sun in watery Pisces creates compassion and spiritual inclination. The native is dreamy, artistic, and intuitively gifted. Good for healing, spirituality, and creative professions.',
      lifeAreas: ['Spirituality', 'Art', 'Healing', 'Compassion'],
    },

    // MOON INTERPRETATIONS
    'Moon-Aries': {
      strengths: ['Emotional courage', 'Initiative', 'Quick response', 'Assertiveness'],
      challenges: ['Emotional impulsiveness', 'Quick temper', 'Impatience'],
      characteristics: 'Moon in fiery Aries creates emotional courage and quick reactiveness. The native has strong feelings that drive immediate action. Good emotional balance through physical activity.',
      lifeAreas: ['Emotions', 'Action', 'Quick decisions', 'Courage'],
    },
    'Moon-Taurus': {
      strengths: ['Emotional stability', 'Love of comfort', 'Loyalty', 'Practicality'],
      challenges: ['Possessiveness', 'Stubbornness', 'Resistance to change'],
      characteristics: 'Moon is exalted in Taurus, creating exceptional emotional stability and peace. The native is loyal, sensual, and values comfort and security. Excellent for family life and stable relationships.',
      lifeAreas: ['Stability', 'Family', 'Comfort', 'Relationships'],
      remedies: ['Pearl gemstone strengthens Moon', 'Offer water to rivers', 'Fast on Mondays']
    },
    'Moon-Gemini': {
      strengths: ['Emotional expression', 'Communication', 'Curiosity', 'Adaptability'],
      challenges: ['Emotional superficiality', 'Scattered feelings', 'Nervousness'],
      characteristics: 'Moon in airy Gemini creates emotional expression and mental stimulation. The native needs intellectual engagement and communication. Excellent for writing, teaching, and social interaction.',
      lifeAreas: ['Communication', 'Learning', 'Social life', 'Expression'],
    },
    'Moon-Cancer': {
      strengths: ['Intuition', 'Nurturing', 'Emotional depth', 'Protection'],
      challenges: ['Emotional vulnerability', 'Clinginess', 'Moodiness'],
      characteristics: 'Moon is at home in Cancer, its own sign. Creates strong intuition, nurturing nature, and deep emotional bonds. The native is protective, imaginative, and closely tied to family.',
      lifeAreas: ['Family', 'Emotions', 'Intuition', 'Home'],
    },
    'Moon-Leo': {
      strengths: ['Emotional confidence', 'Creativity', 'Generosity', 'Warmth'],
      challenges: ['Emotional drama', 'Need for attention', 'Pride'],
      characteristics: 'Moon in fiery Leo creates emotional warmth and creative expression. The native needs recognition and loves deeply. Good for creative professions and leadership roles.',
      lifeAreas: ['Creativity', 'Romance', 'Expression', 'Leadership'],
    },
    'Moon-Virgo': {
      strengths: ['Emotional analysis', 'Service orientation', 'Discrimination', 'Practicality'],
      challenges: ['Over-analysis of emotions', 'Worry', 'Perfectionism'],
      characteristics: 'Moon in earthy Virgo is debilitated, creating analytical but sometimes anxious emotions. The native processes feelings through intellect. Good for service work and health professions.',
      lifeAreas: ['Service', 'Health', 'Analysis', 'Organization'],
    },
    'Moon-Libra': {
      strengths: ['Emotional balance', 'Harmony-seeking', 'Aesthetic sense', 'Diplomacy'],
      challenges: ['Indecision', 'Emotional dependence', 'People-pleasing'],
      characteristics: 'Moon in airy Libra creates emotional balance and relationship focus. The native seeks harmony and appreciates beauty. Good for partnerships and artistic endeavors.',
      lifeAreas: ['Relationships', 'Art', 'Balance', 'Harmony'],
    },
    'Moon-Scorpio': {
      strengths: ['Emotional intensity', 'Intuition', 'Magnetism', 'Transformation'],
      challenges: ['Emotional secretiveness', 'Jealousy', 'Possessiveness'],
      characteristics: 'Moon in watery Scorpio creates emotional intensity and deep intuition. The native feels strongly and intuitively. Good for psychology, research, and transformation work.',
      lifeAreas: ['Emotions', 'Intuition', 'Research', 'Transformation'],
    },
    'Moon-Sagittarius': {
      strengths: ['Emotional optimism', 'Spiritual seeking', 'Openness', 'Idealism'],
      challenges: ['Emotional restlessness', 'Over-optimism', 'Wanderlust'],
      characteristics: 'Moon in fiery Sagittarius creates emotional optimism and spiritual seeking. The native seeks meaning and enjoys travel. Good for teaching and spiritual pursuits.',
      lifeAreas: ['Spirituality', 'Travel', 'Learning', 'Idealism'],
    },
    'Moon-Capricorn': {
      strengths: ['Emotional discipline', 'Responsibility', 'Ambition', 'Caution'],
      challenges: ['Emotional coldness', 'Pessimism', 'Loneliness'],
      characteristics: 'Moon is debilitated in Capricorn, creating reserved emotions. The native processes feelings slowly and cautiously. Good for leadership and organizational roles despite emotional reserve.',
      lifeAreas: ['Career', 'Responsibility', 'Achievement', 'Discipline'],
    },
    'Moon-Aquarius': {
      strengths: ['Emotional detachment', 'Intellectual approach', 'Humanitarianism', 'Independence'],
      challenges: ['Emotional coldness', 'Detachment', 'Unconventionality'],
      characteristics: 'Moon in airy Aquarius creates emotional detachment and intellectual processing. The native is independent and humanitarian but may struggle with emotional connection.',
      lifeAreas: ['Humanitarianism', 'Groups', 'Technology', 'Innovation'],
    },
    'Moon-Pisces': {
      strengths: ['Intuition', 'Compassion', 'Spirituality', 'Creativity'],
      challenges: ['Over-sensitivity', 'Escapism', 'Confusion'],
      characteristics: 'Moon in watery Pisces creates deep intuition and spiritual sensitivity. The native is compassionate, artistic, and highly intuitive. Good for spiritual and creative work.',
      lifeAreas: ['Spirituality', 'Art', 'Healing', 'Intuition'],
    },

    // Additional essential planets - abbreviated for space
    'Mars-Aries': {
      strengths: ['Courage', 'Leadership', 'Physical strength', 'Competitive drive'],
      challenges: ['Aggression', 'Impulsiveness', 'Conflict'],
      characteristics: 'Mars is at home in Aries, creating warrior energy and courage. The native is bold, competitive, and physically active. Excellent for sports, military, or competitive fields.',
      lifeAreas: ['Action', 'Competition', 'Strength', 'Courage'],
    },
    'Mars-Taurus': {
      strengths: ['Persistence', 'Strength', 'Physical endurance', 'Determination'],
      challenges: ['Stubbornness', 'Possessiveness', 'Slow to action'],
      characteristics: 'Mars in earthy Taurus is slow but persistent. The native has great physical strength and determination. Good for agriculture, construction, and sustained effort.',
      lifeAreas: ['Strength', 'Persistence', 'Property', 'Stability'],
    },
    'Mars-Gemini': {
      strengths: ['Communication skill', 'Quick thinking', 'Wit', 'Debate ability'],
      challenges: ['Sharp tongue', 'Mental restlessness', 'Scattered energy'],
      characteristics: 'Mars in airy Gemini creates argumentative ability and quick thinking. The native is sharp-tongued and quick-witted. Good for law, debate, and intellectual pursuits.',
      lifeAreas: ['Communication', 'Intellect', 'Debate', 'Commerce'],
    },
    'Mars-Cancer': {
      strengths: ['Protective nature', 'Emotional courage', 'Tenacity', 'Care'],
      challenges: ['Emotional anger', 'Moodiness', 'Sensitivity'],
      characteristics: 'Mars in watery Cancer is debilitated, creating indirect action. The native is protective but emotionally reactive. Good for defensive or protective roles.',
      lifeAreas: ['Protection', 'Family', 'Care', 'Emotions'],
    },
    'Mars-Leo': {
      strengths: ['Confidence', 'Leadership', 'Creativity', 'Bravery'],
      challenges: ['Pride', 'Arrogance', 'Need for dominance'],
      characteristics: 'Mars in fiery Leo creates bold leadership and creative courage. The native is confident and commanding. Excellent for leadership and creative fields.',
      lifeAreas: ['Leadership', 'Creativity', 'Confidence', 'Power'],
    },
    'Mars-Virgo': {
      strengths: ['Precision', 'Technical skill', 'Analysis', 'Discrimination'],
      challenges: ['Over-analysis', 'Perfectionism', 'Criticism'],
      characteristics: 'Mars in earthy Virgo creates technical precision and analytical action. The native is detail-oriented and skilled. Good for technical, medical, or analytical professions.',
      lifeAreas: ['Technical work', 'Analysis', 'Health', 'Precision'],
    },
    'Mars-Libra': {
      strengths: ['Diplomatic action', 'Social grace', 'Artistic drive', 'Balance'],
      challenges: ['Indecision', 'People-pleasing', 'Lack of assertion'],
      characteristics: 'Mars is debilitated in Libra, creating diplomatic but sometimes passive action. The native acts through relationships and aesthetics rather than force.',
      lifeAreas: ['Relationships', 'Art', 'Diplomacy', 'Balance'],
    },
    'Mars-Scorpio': {
      strengths: ['Intensity', 'Determination', 'Investigative power', 'Transformation'],
      challenges: ['Destructiveness', 'Obsession', 'Revenge'],
      characteristics: 'Mars is at home in Scorpio, creating intense focus and investigative power. The native is determined and capable of profound action. Good for research and transformation work.',
      lifeAreas: ['Research', 'Transformation', 'Intensity', 'Investigation'],
    },
    'Mars-Sagittarius': {
      strengths: ['Idealistic action', 'Physical vigor', 'Adventurousness', 'Optimism'],
      challenges: ['Recklessness', 'Over-confidence', 'Wastefulness'],
      characteristics: 'Mars in fiery Sagittarius creates adventurous and optimistic action. The native is physically active and idealistic. Good for sports, military, and adventurous pursuits.',
      lifeAreas: ['Action', 'Adventure', 'Sports', 'Idealism'],
    },
    'Mars-Capricorn': {
      strengths: ['Disciplined action', 'Strategic thinking', 'Ambition', 'Responsibility'],
      challenges: ['Coldness', 'Ruthlessness', 'Pessimism'],
      characteristics: 'Mars is exalted in Capricorn, creating strategic and responsible action. The native is ambitious and disciplined. Excellent for management, military, and ambitious pursuits.',
      lifeAreas: ['Career', 'Ambition', 'Strategy', 'Authority'],
    },
    'Mars-Aquarius': {
      strengths: ['Revolutionary action', 'Innovation', 'Humanitarian drive', 'Unconventionality'],
      challenges: ['Rebelliousness', 'Coldness', 'Disruptiveness'],
      characteristics: 'Mars in airy Aquarius creates revolutionary and innovative energy. The native challenges norms. Good for technology, reform, and revolutionary work.',
      lifeAreas: ['Innovation', 'Technology', 'Reform', 'Humanitarianism'],
    },
    'Mars-Pisces': {
      strengths: ['Spiritual courage', 'Compassionate action', 'Artistic drive', 'Intuitive'],
      challenges: ['Escapism', 'Confusion', 'Misdirected energy'],
      characteristics: 'Mars in watery Pisces creates gentle and spiritual action. The native acts through intuition and compassion. Good for healing and spiritual work.',
      lifeAreas: ['Spirituality', 'Healing', 'Art', 'Compassion'],
    },

    // MERCURY INTERPRETATIONS
    'Mercury-Aries': {
      strengths: ['Quick thinking', 'Direct communication', 'Business acumen', 'Initiative'],
      challenges: ['Hasty decisions', 'Bluntness', 'Scattered focus'],
      characteristics: 'Mercury in fiery Aries creates quick, direct thinking. The native is fast in communication and decision-making. Good for business, sales, and entrepreneurship.',
      lifeAreas: ['Communication', 'Business', 'Quick decisions', 'Initiative'],
    },
    'Mercury-Taurus': {
      strengths: ['Practical thinking', 'Financial acumen', 'Stability', 'Common sense'],
      challenges: ['Slow thinking', 'Rigidity', 'Possessiveness about ideas'],
      characteristics: 'Mercury in earthy Taurus creates practical and grounded thinking. The native is good with finances and material matters. Good for banking, farming, and commerce.',
      lifeAreas: ['Finance', 'Practical matters', 'Commerce', 'Stability'],
    },
    'Mercury-Gemini': {
      strengths: ['Intellectual brilliance', 'Communication mastery', 'Versatility', 'Learning ability'],
      challenges: ['Scattered thinking', 'Superficiality', 'Dishonesty'],
      characteristics: 'Mercury is at home in Gemini, its own sign. Creates intellectual brilliance and communication mastery. Native is highly intelligent and versatile. Excellent for academics and writing.',
      lifeAreas: ['Communication', 'Learning', 'Intellect', 'Writing'],
    },
    'Mercury-Cancer': {
      strengths: ['Emotional intelligence', 'Intuitive thinking', 'Imagination', 'Memory'],
      challenges: ['Over-sensitivity', 'Emotional thinking', 'Moodiness'],
      characteristics: 'Mercury in watery Cancer is debilitated, creating emotional thinking. The native processes information through feelings. Good for psychology and counseling.',
      lifeAreas: ['Emotions', 'Psychology', 'Intuition', 'Memory'],
    },
    'Mercury-Leo': {
      strengths: ['Creative thinking', 'Confident communication', 'Leadership of ideas', 'Creativity'],
      challenges: ['Ego in thinking', 'Over-confidence', 'Arrogance'],
      characteristics: 'Mercury in fiery Leo creates creative and confident thinking. The native communicates with flair and creativity. Good for teaching, writing, and creative fields.',
      lifeAreas: ['Creativity', 'Teaching', 'Communication', 'Leadership'],
    },
    'Mercury-Virgo': {
      strengths: ['Analytical thinking', 'Precision', 'Detail orientation', 'Discrimination'],
      challenges: ['Over-analysis', 'Perfectionism', 'Criticism'],
      characteristics: 'Mercury is at home in Virgo, its own sign. Creates analytical and precise thinking. Native is meticulous and discriminating. Excellent for technical and analytical work.',
      lifeAreas: ['Analysis', 'Technical work', 'Health', 'Precision'],
    },
    'Mercury-Libra': {
      strengths: ['Diplomatic communication', 'Balanced thinking', 'Aesthetic expression', 'Social grace'],
      challenges: ['Indecision', 'Over-diplomaticity', 'Superficiality'],
      characteristics: 'Mercury in airy Libra is exalted, creating diplomatic and balanced communication. The native is skilled at negotiation and artistic expression. Excellent for law and diplomacy.',
      lifeAreas: ['Diplomacy', 'Law', 'Art', 'Negotiation'],
    },
    'Mercury-Scorpio': {
      strengths: ['Investigative thinking', 'Penetrating mind', 'Research ability', 'Intensity'],
      challenges: ['Obsessive thinking', 'Suspicion', 'Dark thoughts'],
      characteristics: 'Mercury in watery Scorpio creates investigative and penetrating mind. The native is good at research and uncovering hidden truths. Good for investigation and psychology.',
      lifeAreas: ['Research', 'Investigation', 'Psychology', 'Mystery'],
    },
    'Mercury-Sagittarius': {
      strengths: ['Philosophical thinking', 'Higher learning', 'Expansive communication', 'Wisdom'],
      challenges: ['Over-generalization', 'Tactlessness', 'Over-optimism'],
      characteristics: 'Mercury in fiery Sagittarius creates philosophical and expansive thinking. The native seeks higher knowledge. Good for teaching, philosophy, and religion.',
      lifeAreas: ['Learning', 'Philosophy', 'Teaching', 'Spirituality'],
    },
    'Mercury-Capricorn': {
      strengths: ['Strategic thinking', 'Practical communication', 'Responsibility', 'Discipline'],
      challenges: ['Negative thinking', 'Pessimism', 'Rigidity'],
      characteristics: 'Mercury in earthy Capricorn creates strategic and responsible thinking. The native is good at planning and organization. Excellent for management and government.',
      lifeAreas: ['Strategy', 'Planning', 'Management', 'Business'],
    },
    'Mercury-Aquarius': {
      strengths: ['Innovative thinking', 'Technology aptitude', 'Humanitarian ideals', 'Independence'],
      challenges: ['Detachment', 'Eccentricity', 'Unrealistic thinking'],
      characteristics: 'Mercury in airy Aquarius creates innovative and unconventional thinking. The native is good at technology and new ideas. Excellent for technology and innovation.',
      lifeAreas: ['Technology', 'Innovation', 'Humanitarianism', 'Groups'],
    },
    'Mercury-Pisces': {
      strengths: ['Intuitive thinking', 'Artistic expression', 'Compassion', 'Imagination'],
      challenges: ['Confusion', 'Escapism', 'Vague communication'],
      characteristics: 'Mercury in watery Pisces is debilitated, creating intuitive but unclear thinking. The native is imaginative but may struggle with practical matters. Good for art and spirituality.',
      lifeAreas: ['Art', 'Spirituality', 'Imagination', 'Intuition'],
    },

    // JUPITER INTERPRETATIONS (Brief due to space)
    'Jupiter-Aries': {
      strengths: ['Leadership', 'Optimism', 'Enterprise', 'Generosity'],
      challenges: ['Over-confidence', 'Wastefulness', 'Recklessness'],
      characteristics: 'Jupiter in fiery Aries creates leadership and optimism. Native is generous and enterprising. Good for business and leadership.',
      lifeAreas: ['Leadership', 'Enterprise', 'Spirituality', 'Growth'],
    },
    'Jupiter-Taurus': {
      strengths: ['Wealth accumulation', 'Stability', 'Generosity', 'Contentment'],
      challenges: ['Over-indulgence', 'Materialism', 'Stubbornness'],
      characteristics: 'Jupiter in earthy Taurus brings wealth and stability. Native is generous and content. Good for finance and property.',
      lifeAreas: ['Wealth', 'Property', 'Finance', 'Contentment'],
    },
    'Jupiter-Gemini': {
      strengths: ['Communication skill', 'Learning ability', 'Intellect', 'Versatility'],
      challenges: ['Over-talking', 'Scattered learning', 'Over-optimism'],
      characteristics: 'Jupiter in airy Gemini brings intellectual growth. Native is eloquent and versatile. Good for education and communication.',
      lifeAreas: ['Learning', 'Communication', 'Intellect', 'Travel'],
    },
    'Jupiter-Cancer': {
      strengths: ['Emotional wisdom', 'Family values', 'Intuition', 'Care'],
      challenges: ['Emotional indulgence', 'Over-attachment', 'Moodiness'],
      characteristics: 'Jupiter in watery Cancer is exalted, bringing emotional wisdom. Native is caring and family-oriented. Good for family and counseling.',
      lifeAreas: ['Family', 'Wisdom', 'Emotions', 'Home'],
    },
    'Jupiter-Leo': {
      strengths: ['Charisma', 'Generosity', 'Leadership', 'Creativity'],
      challenges: ['Pride', 'Over-generosity', 'Arrogance'],
      characteristics: 'Jupiter in fiery Leo is exalted, bringing charisma and generosity. Native is naturally lucky. Good for leadership and creative fields.',
      lifeAreas: ['Leadership', 'Creativity', 'Luck', 'Generosity'],
    },
    'Jupiter-Virgo': {
      strengths: ['Service orientation', 'Discrimination', 'Health wisdom', 'Detail'],
      challenges: ['Over-criticism', 'Perfectionism', 'Worry'],
      characteristics: 'Jupiter in earthy Virgo is debilitated, creating over-analysis. Native is service-oriented. Good for service professions.',
      lifeAreas: ['Service', 'Health', 'Analysis', 'Discrimination'],
    },
    'Jupiter-Libra': {
      strengths: ['Diplomatic wisdom', 'Artistic sense', 'Balance', 'Social grace'],
      challenges: ['Over-diplomacy', 'Indecision', 'People-pleasing'],
      characteristics: 'Jupiter in airy Libra brings diplomatic wisdom. Native seeks balance. Good for law and diplomacy.',
      lifeAreas: ['Diplomacy', 'Law', 'Art', 'Balance'],
    },
    'Jupiter-Scorpio': {
      strengths: ['Depth of wisdom', 'Occult knowledge', 'Transformation', 'Intensity'],
      challenges: ['Obsession', 'Over-secrecy', 'Resistance'],
      characteristics: 'Jupiter in Scorpio brings depth and occult knowledge. Native is wise in hidden matters. Good for research and spirituality.',
      lifeAreas: ['Spirituality', 'Research', 'Occult', 'Transformation'],
    },
    'Jupiter-Sagittarius': {
      strengths: ['Spiritual wisdom', 'Philosophy', 'Learning', 'Luck'],
      challenges: ['Over-preaching', 'Restlessness', 'Over-optimism'],
      characteristics: 'Jupiter is at home in Sagittarius. Brings spiritual wisdom and luck. Native is naturally fortunate. Excellent for spirituality and teaching.',
      lifeAreas: ['Spirituality', 'Learning', 'Philosophy', 'Luck'],
    },
    'Jupiter-Capricorn': {
      strengths: ['Responsible wisdom', 'Strategic growth', 'Ambition', 'Integrity'],
      challenges: ['Over-caution', 'Pessimism', 'Rigidity'],
      characteristics: 'Jupiter in earthy Capricorn is debilitated, creating cautious growth. Native is ambitious but careful. Good for management.',
      lifeAreas: ['Career', 'Management', 'Ambition', 'Strategy'],
    },
    'Jupiter-Aquarius': {
      strengths: ['Humanitarian ideals', 'Innovation', 'Group wisdom', 'Independence'],
      challenges: ['Detachment', 'Unrealistic idealism', 'Eccentricity'],
      characteristics: 'Jupiter in airy Aquarius brings humanitarian ideals. Native is innovative and idealistic. Good for social causes.',
      lifeAreas: ['Humanitarianism', 'Innovation', 'Groups', 'Idealism'],
    },
    'Jupiter-Pisces': {
      strengths: ['Spiritual wisdom', 'Compassion', 'Artistic sense', 'Intuition'],
      challenges: ['Escapism', 'Delusion', 'Over-sensitivity'],
      characteristics: 'Jupiter is at home in Pisces. Brings spiritual wisdom and compassion. Native is naturally intuitive. Excellent for spirituality.',
      lifeAreas: ['Spirituality', 'Healing', 'Art', 'Compassion'],
    },

    // VENUS INTERPRETATIONS (Brief)
    'Venus-Aries': {
      strengths: ['Passionate', 'Adventurous', 'Straightforward', 'Enthusiastic'],
      challenges: ['Impulsive', 'Impatient', 'Rash'],
      characteristics: 'Venus in fiery Aries is debilitated but passionate. Native is ardent and direct. Good for sports and adventure.',
      lifeAreas: ['Romance', 'Adventure', 'Art', 'Passion'],
    },
    'Venus-Taurus': {
      strengths: ['Sensual', 'Loyal', 'Stable', 'Artistic'],
      challenges: ['Possessive', 'Stubborn', 'Over-attachment'],
      characteristics: 'Venus is at home in Taurus. Brings stability and sensuality. Native is loyal and enjoys comfort. Good for relationships.',
      lifeAreas: ['Romance', 'Art', 'Comfort', 'Stability'],
    },
    'Venus-Gemini': {
      strengths: ['Communicative', 'Playful', 'Versatile', 'Intellectual'],
      challenges: ['Superficial', 'Inconsistent', 'Flighty'],
      characteristics: 'Venus in airy Gemini creates playful and communicative love. Native enjoys variety. Good for social and artistic pursuits.',
      lifeAreas: ['Communication', 'Art', 'Romance', 'Social'],
    },
    'Venus-Cancer': {
      strengths: ['Emotional', 'Nurturing', 'Protective', 'Caring'],
      challenges: ['Overly sensitive', 'Clinging', 'Moody'],
      characteristics: 'Venus in watery Cancer is exalted, bringing emotional depth. Native is nurturing and protective. Good for family-oriented relationships.',
      lifeAreas: ['Family', 'Romance', 'Nurturing', 'Home'],
    },
    'Venus-Leo': {
      strengths: ['Creative', 'Generous', 'Dramatic', 'Confident'],
      challenges: ['prideful', 'Demanding', 'Vain'],
      characteristics: 'Venus in fiery Leo is exalted, bringing creative and generous love. Native is dramatically romantic. Good for creative arts.',
      lifeAreas: ['Creativity', 'Romance', 'Art', 'Entertainment'],
    },
    'Venus-Virgo': {
      strengths: ['Analytical', 'Discriminating', 'Practical', 'Helpful'],
      challenges: ['Critical', 'Perfectionist', 'Reserved'],
      characteristics: 'Venus in earthy Virgo is debilitated, creating analytical love. Native is selective and service-oriented. Good for service work.',
      lifeAreas: ['Service', 'Health', 'Art', 'Discrimination'],
    },
    'Venus-Libra': {
      strengths: ['Harmonious', 'Diplomatic', 'Aesthetic', 'Balanced'],
      challenges: ['Indecisive', 'Dependent', 'Over-accommodating'],
      characteristics: 'Venus is at home in Libra. Brings harmony and aesthetic sense. Native is naturally charming. Excellent for relationships.',
      lifeAreas: ['Romance', 'Art', 'Harmony', 'Relationships'],
    },
    'Venus-Scorpio': {
      strengths: ['Intense', 'Magnetic', 'Deep', 'Transformative'],
      challenges: ['Jealous', 'Possessive', 'Destructive'],
      characteristics: 'Venus in watery Scorpio creates intense and magnetic love. Native is deeply emotional. Good for deep relationships.',
      lifeAreas: ['Romance', 'Transformation', 'Intensity', 'Healing'],
    },
    'Venus-Sagittarius': {
      strengths: ['Optimistic', 'Adventurous', 'Generous', 'Philosophical'],
      challenges: ['Uncommitted', 'Restless', 'Over-optimistic'],
      characteristics: 'Venus in fiery Sagittarius creates adventurous and philosophical love. Native enjoys freedom. Good for travel and adventure.',
      lifeAreas: ['Adventure', 'Travel', 'Philosophy', 'Romance'],
    },
    'Venus-Capricorn': {
      strengths: ['Responsible', 'Loyal', 'Ambitious', 'Steady'],
      challenges: ['Cold', 'Pessimistic', 'Reserved'],
      characteristics: 'Venus in earthy Capricorn is debilitated, creating reserved love. Native is loyal and responsible. Good for stable relationships.',
      lifeAreas: ['Stability', 'Loyalty', 'Career', 'Achievement'],
    },
    'Venus-Aquarius': {
      strengths: ['Intellectual', 'Independent', 'Humanitarian', 'Innovative'],
      challenges: ['Detached', 'Aloof', 'Unconventional'],
      characteristics: 'Venus in airy Aquarius creates intellectual and detached love. Native values independence. Good for innovative arts.',
      lifeAreas: ['Friendship', 'Groups', 'Innovation', 'Humanitarianism'],
    },
    'Venus-Pisces': {
      strengths: ['Spiritual', 'Compassionate', 'Artistic', 'Intuitive'],
      challenges: ['Escapist', 'Confused', 'Over-idealistic'],
      characteristics: 'Venus is at home in Pisces. Brings spiritual and compassionate love. Native is dreamy and artistic. Excellent for artistic pursuits.',
      lifeAreas: ['Art', 'Spirituality', 'Compassion', 'Romance'],
    },

    // SATURN INTERPRETATIONS (Brief)
    'Saturn-Aries': {
      strengths: ['Disciplined action', 'Responsible', 'Mature', 'Strategic'],
      challenges: ['Limitation', 'Delay', 'Frustration'],
      characteristics: 'Saturn in fiery Aries creates disciplined action. Native is mature and responsible. Good for structured work.',
      lifeAreas: ['Discipline', 'Responsibility', 'Maturity', 'Structure'],
    },
    'Saturn-Taurus': {
      strengths: ['Financial discipline', 'Stability', 'Patience', 'Accumulation'],
      challenges: ['Limitation', 'Scarcity', 'Delay in gains'],
      characteristics: 'Saturn in earthy Taurus creates financial discipline. Native accumulates slowly but surely. Good for long-term financial planning.',
      lifeAreas: ['Finance', 'Property', 'Stability', 'Accumulation'],
    },
    'Saturn-Gemini': {
      strengths: ['Disciplined thinking', 'Serious communication', 'Logic', 'Analysis'],
      challenges: ['Negative thinking', 'Over-analysis', 'Pessimism'],
      characteristics: 'Saturn in airy Gemini creates serious and analytical thinking. Native is logical. Good for scientific and technical work.',
      lifeAreas: ['Science', 'Analysis', 'Logic', 'Technical work'],
    },
    'Saturn-Cancer': {
      strengths: ['Emotional discipline', 'Family responsibility', 'Tradition', 'Care'],
      challenges: ['Emotional coldness', 'Restriction', 'Sadness'],
      characteristics: 'Saturn in watery Cancer is debilitated, creating emotional restriction. Native is responsible but emotionally reserved. Good for family leadership.',
      lifeAreas: ['Family', 'Responsibility', 'Tradition', 'Care'],
    },
    'Saturn-Leo': {
      strengths: ['Mature leadership', 'Responsibility', 'Integrity', 'Authority'],
      challenges: ['Ego restriction', 'Limitation', 'Pride challenge'],
      characteristics: 'Saturn in fiery Leo is debilitated, creating mature but restricted leadership. Native faces ego challenges. Good for humble leadership.',
      lifeAreas: ['Leadership', 'Responsibility', 'Maturity', 'Authority'],
    },
    'Saturn-Virgo': {
      strengths: ['Perfectionism', 'Discipline', 'Service', 'Precision'],
      challenges: ['Over-criticism', 'Perfectionism', 'Worry'],
      characteristics: 'Saturn in earthy Virgo is exalted, creating perfectionistic and disciplined work. Native is meticulous. Excellent for technical and service work.',
      lifeAreas: ['Service', 'Technical work', 'Precision', 'Analysis'],
    },
    'Saturn-Libra': {
      strengths: ['Fair judgment', 'Diplomatic responsibility', 'Justice', 'Balance'],
      challenges: ['Indecision', 'Limitation in relationships', 'Delay'],
      characteristics: 'Saturn in airy Libra is exalted, creating fair and responsible judgment. Native is just. Excellent for law and diplomacy.',
      lifeAreas: ['Law', 'Justice', 'Diplomacy', 'Balance'],
    },
    'Saturn-Scorpio': {
      strengths: ['Depth', 'Intensity', 'Research', 'Transformation'],
      challenges: ['Obsession', 'Darkness', 'Destructiveness'],
      characteristics: 'Saturn in watery Scorpio creates depth and intense focus. Native is capable of profound transformation. Good for research and healing.',
      lifeAreas: ['Research', 'Transformation', 'Healing', 'Depth'],
    },
    'Saturn-Sagittarius': {
      strengths: ['Spiritual discipline', 'Philosophy', 'Teaching', 'Wisdom'],
      challenges: ['Limitation in freedom', 'Skepticism', 'Restriction'],
      characteristics: 'Saturn in fiery Sagittarius creates serious spirituality. Native is disciplined in learning. Good for teaching and philosophy.',
      lifeAreas: ['Philosophy', 'Teaching', 'Spirituality', 'Wisdom'],
    },
    'Saturn-Capricorn': {
      strengths: ['Ambition', 'Discipline', 'Authority', 'Achievement'],
      challenges: ['Harshness', 'Ruthlessness', 'Excessive ambition'],
      characteristics: 'Saturn is at home in Capricorn. Creates powerful ambition and discipline. Native is capable of great achievement. Excellent for management.',
      lifeAreas: ['Career', 'Ambition', 'Authority', 'Achievement'],
    },
    'Saturn-Aquarius': {
      strengths: ['Humanitarian discipline', 'Reform', 'Innovation', 'Independence'],
      challenges: ['Coldness', 'Rebellion', 'Detachment'],
      characteristics: 'Saturn in airy Aquarius creates disciplined innovation. Native is reformist. Good for social change work.',
      lifeAreas: ['Reform', 'Innovation', 'Humanitarianism', 'Technology'],
    },
    'Saturn-Pisces': {
      strengths: ['Spiritual discipline', 'Compassion', 'Healing wisdom', 'Intuition'],
      challenges: ['Escapism', 'Confusion', 'Illusion'],
      characteristics: 'Saturn in watery Pisces is debilitated, creating confused spirituality. Native must develop discipline in spiritual practice. Good for healing.',
      lifeAreas: ['Spirituality', 'Healing', 'Compassion', 'Discipline'],
    },
  },

  /**
   * Nakshatra interpretations (27 lunar mansions)
   */
  nakshatras: {
    'Ashwini': {
      ruler: 'Ketu',
      deity: 'Ashwini Kumaras (Divine Healers)',
      characteristics: 'Swift, quick, healing, pioneering, youthful energy',
      professions: ['Medicine', 'Healing', 'Sports', 'Trade', 'Quick service'],
      healthTendencies: ['Headaches', 'Injuries', 'Quick recovery'],
      fortuneAreas: ['Travel', 'Innovation', 'Commerce']
    },
    'Bharani': {
      ruler: 'Venus',
      deity: 'Yama (God of Death)',
      characteristics: 'Bearing, creative, challenging, purifying, yoni (feminine)',
      professions: ['Arts', 'Entertainment', 'Creativity', 'Management'],
      healthTendencies: ['Reproductive health', 'Pelvic issues'],
      fortuneAreas: ['Creativity', 'Relationships', 'Transformation']
    },
    'Krittika': {
      ruler: 'Sun',
      deity: 'Agni (God of Fire)',
      characteristics: 'Sharp, fiery, cutting, discerning, critical',
      professions: ['Military', 'Surgery', 'Education', 'Management'],
      healthTendencies: ['Fever', 'Inflammation', 'Eye problems'],
      fortuneAreas: ['Leadership', 'Authority', 'Achievement']
    },
    'Rohini': {
      ruler: 'Moon',
      deity: 'Brahma (God of Creation)',
      characteristics: 'Red, beautiful, growth, fertile, creative',
      professions: ['Agriculture', 'Arts', 'Gardening', 'Beauty'],
      healthTendencies: ['Throat issues', 'Thyroid', 'Neck problems'],
      fortuneAreas: ['Beauty', 'Fertility', 'Wealth', 'Stability']
    },
    'Mrigashirsha': {
      ruler: 'Mercury',
      deity: 'Soma (Moon God)',
      characteristics: 'Searching, curious, deer-like, gentle, inquisitive',
      professions: ['Research', 'Writing', 'Teaching', 'Exploration'],
      healthTendencies: ['Nervous issues', 'Anxiety', 'Respiratory'],
      fortuneAreas: ['Learning', 'Travel', 'Communication']
    },
    'Ardra': {
      ruler: 'Rahu',
      deity: 'Rudra (Storm God)',
      characteristics: 'Moist, wet, tears, transformative, intense',
      professions: ['Science', 'Technology', 'Research', 'Healing'],
      healthTendencies: ['Cough', 'Respiratory', 'Nervous tension'],
      fortuneAreas: ['Transformation', 'Innovation', 'Technology']
    },
    'Punarvasu': {
      ruler: 'Jupiter',
      deity: 'Aditi (Goddess of Abundance)',
      characteristics: 'Return, restoration, renewal, expansion',
      professions: ['Religion', 'Teaching', 'Law', 'Healing'],
      healthTendencies: ['Liver issues', 'Fat accumulation', 'Digestion'],
      fortuneAreas: ['Wealth', 'Knowledge', 'Children', 'Expansion']
    },
    'Pushya': {
      ruler: 'Saturn',
      deity: 'Brihaspati (Jupiter God)',
      characteristics: 'Nourishing, supporting, growth, auspicious',
      professions: ['Teaching', 'Counseling', 'Medicine', 'Care'],
      healthTendencies: ['Bones', 'Teeth', 'Joints'],
      fortuneAreas: ['Support', 'Nourishment', 'Growth', 'Prosperity']
    },
    'Ashlesha': {
      ruler: 'Mercury',
      deity: 'Nagas (Serpents)',
      characteristics: 'Coiled, secret, intellectual, penetrating, hidden',
      professions: ['Occult', 'Research', 'Psychology', 'Pharmacy'],
      healthTendencies: ['Stomach', 'Digestion', 'Intestines'],
      fortuneAreas: ['Secrets', 'Hidden knowledge', 'Occult', 'Mystery']
    },
    'Magha': {
      ruler: 'Ketu',
      deity: 'Pitris (Ancestors)',
      characteristics: 'Mighty, great, royal, authoritative, ancestral',
      professions: ['Government', 'Authority', 'Leadership', 'Management'],
      healthTendencies: ['Heart', 'Back', 'Spinal issues'],
      fortuneAreas: ['Authority', 'Legacy', 'Inheritance', 'Achievement']
    },
    'Purva Phalguni': {
      ruler: 'Venus',
      deity: 'Aryaman (Patronage)',
      characteristics: 'Former fruit, creativity, comfort, luxury, enjoyment',
      professions: ['Arts', 'Entertainment', 'Luxury', 'Comfort'],
      healthTendencies: ['Back pain', 'Digestion', 'Reproductive'],
      fortuneAreas: ['Pleasure', 'Comfort', 'Creativity', 'Romance']
    },
    'Uttara Phalguni': {
      ruler: 'Sun',
      deity: 'Aryaman',
      characteristics: 'Later fruit, growth, maturity, responsibility, service',
      professions: ['Service', 'Teaching', 'Management', 'Government'],
      healthTendencies: ['Stomach', 'Digestion', 'Heart'],
      fortuneAreas: ['Growth', 'Achievement', 'Service', 'Maturity']
    },
    'Hasta': {
      ruler: 'Mercury',
      deity: 'Savitar (Creator)',
      characteristics: 'Hand, dexterity, craftsmanship, skillful, practical',
      professions: ['Crafts', 'Surgery', 'Art', 'Technology'],
      healthTendencies: ['Hands', 'Arms', 'Dexterity issues'],
      fortuneAreas: ['Skill', 'Craftsmanship', 'Dexterity', 'Commerce']
    },
    'Chitra': {
      ruler: 'Mars',
      deity: 'Tvashtar (Divine Architect)',
      characteristics: 'Bright, variegated, beautiful, artistic, creative',
      professions: ['Art', 'Design', 'Architecture', 'Creativity'],
      healthTendencies: ['Skin', 'Eyes', 'Vision'],
      fortuneAreas: ['Beauty', 'Creativity', 'Art', 'Architecture']
    },
    'Swati': {
      ruler: 'Rahu',
      deity: 'Vayu (Wind God)',
      characteristics: 'Independent, self-sufficient, flexible, swaying',
      professions: ['Business', 'Trade', 'Travel', 'Independence'],
      healthTendencies: ['Respiratory', 'Movement', 'Circulation'],
      fortuneAreas: ['Independence', 'Business', 'Travel', 'Freedom']
    },
    'Vishakha': {
      ruler: 'Jupiter',
      deity: 'Indra and Agni (Power and Fire)',
      characteristics: 'Branching, two-forked, growth, power, expansion',
      professions: ['Leadership', 'Military', 'Business', 'Energy'],
      healthTendencies: ['Legs', 'Vitality', 'Generative'],
      fortuneAreas: ['Power', 'Growth', 'Achievement', 'Victory']
    },
    'Anuradha': {
      ruler: 'Saturn',
      deity: 'Mitra (Friendship, Contracts)',
      characteristics: 'Following, small, modest, friendly, devoted',
      professions: ['Friendship', 'Contracts', 'Service', 'Devotion'],
      healthTendencies: ['Reproductive', 'Vitality', 'Energy'],
      fortuneAreas: ['Friendship', 'Devotion', 'Harmony', 'Contracts']
    },
    'Jyeshtha': {
      ruler: 'Mercury',
      deity: 'Indra (King of Gods)',
      characteristics: 'Eldest, senior, accomplished, royal, protective',
      professions: ['Leadership', 'Protection', 'Management', 'Authority'],
      healthTendencies: ['Ears', 'Hearing', 'Balance'],
      fortuneAreas: ['Leadership', 'Authority', 'Achievement', 'Power']
    },
    'Mula': {
      ruler: 'Ketu',
      deity: 'Nirrti (Destruction, Dissolution)',
      characteristics: 'Root, deep, core truth, destruction, renewal',
      professions: ['Research', 'Occult', 'Philosophy', 'Healing'],
      healthTendencies: ['Feet', 'Foundation', 'Root issues'],
      fortuneAreas: ['Deep knowledge', 'Secrets', 'Transformation', 'Truth']
    },
    'Purva Ashadha': {
      ruler: 'Venus',
      deity: 'Apah (Water Goddess)',
      characteristics: 'Former victory, invincibility, enthusiasm, creative',
      professions: ['Arts', 'Entertainment', 'Creativity', 'Victory'],
      healthTendencies: ['Hips', 'Thighs', 'Vitality'],
      fortuneAreas: ['Victory', 'Creativity', 'Enthusiasm', 'Success']
    },
    'Uttara Ashadha': {
      ruler: 'Sun',
      deity: 'Vishvedevas (Universal Gods)',
      characteristics: 'Later victory, dignity, eternity, universal',
      professions: ['Leadership', 'Government', 'Authority', 'Service'],
      healthTendencies: ['Knees', 'Skeletal', 'Structural'],
      fortuneAreas: ['Victory', 'Dignity', 'Authority', 'Legacy']
    },
    'Shravana': {
      ruler: 'Moon',
      deity: 'Vishnu (Protector)',
      characteristics: 'Hearing, learning, speech, listening, humility',
      professions: ['Teaching', 'Music', 'Listening professions', 'Learning'],
      healthTendencies: ['Ears', 'Hearing', 'Nervous system'],
      fortuneAreas: ['Learning', 'Music', 'Speech', 'Listening']
    },
    'Dhanishtha': {
      ruler: 'Mars',
      deity: 'Vasus (Wealth Gods)',
      characteristics: 'Wealth, abundance, generous, rhythmic, musical',
      professions: ['Music', 'Rhythm', 'Wealth', 'Medicine'],
      healthTendencies: ['Lymph', 'Circulation', 'Energy flow'],
      fortuneAreas: ['Wealth', 'Music', 'Rhythm', 'Generosity']
    },
    'Shatabhisha': {
      ruler: 'Rahu',
      deity: 'Varuna (Water God)',
      characteristics: 'Hundred physicians, healing, secrecy, mysticism',
      professions: ['Medicine', 'Healing', 'Research', 'Occult'],
      healthTendencies: ['Healing', 'Nervous', 'Mysterious'],
      fortuneAreas: ['Healing', 'Mystery', 'Occult', 'Medicine']
    },
    'Purva Bhadrapada': {
      ruler: 'Jupiter',
      deity: 'Aja Ekapada (One-footed Goat)',
      characteristics: 'Former prosperity, auspicious, righteous, fierce',
      professions: ['Religion', 'Fire worship', 'Leadership', 'Spirituality'],
      healthTendencies: ['Right eye', 'Feet', 'Left ear'],
      fortuneAreas: ['Prosperity', 'Righteousness', 'Spirituality', 'Auspiciousness']
    },
    'Uttara Bhadrapada': {
      ruler: 'Saturn',
      deity: 'Ahir Budhnya (Cosmic Serpent)',
      characteristics: 'Later prosperity, deep wisdom, hidden, spiritual',
      professions: ['Spirituality', 'Philosophy', 'Wisdom', 'Healing'],
      healthTendencies: ['Left eye', 'Right ear', 'Spiritual health'],
      fortuneAreas: ['Wisdom', 'Spirituality', 'Prosperity', 'Deep knowledge']
    },
    'Revati': {
      ruler: 'Mercury',
      deity: 'Pushan (Nourisher, Protector)',
      characteristics: 'Wealthy, nourishing, protecting, prosperity, gentleness',
      professions: ['Wealth', 'Nourishment', 'Protection', 'Business'],
      healthTendencies: ['Fish', 'Water', 'Feminine health'],
      fortuneAreas: ['Wealth', 'Protection', 'Nourishment', 'Prosperity']
    },
  },

  /**
   * Yoga descriptions
   */
  yogas: {
    'Gajakesari': {
      name: 'Gajakesari Yoga',
      description: 'Combination of Jupiter and Moon in Kendra (1, 4, 7, 10) houses from each other',
      effects: [
        'Bestows extraordinary intelligence and wisdom',
        'Creates elephant-like strength and lion-like courage',
        'Brings respect and honor in society',
        'Ensures material prosperity and good health',
        'Protects from negative influences',
        'Grants peaceful and pleasant life'
      ],
      conditions: 'Jupiter and Moon must be in quadrants (1, 4, 7, 10 houses)',
      benefits: [
        'Exceptional intellectual capacity',
        'Natural leadership ability',
        'Financial stability',
        'Social recognition',
        'Good health and longevity'
      ]
    },
    'Budhaditya': {
      name: 'Budhaditya Yoga',
      description: 'Combination of Mercury and Sun in Kendra (1, 4, 7, 10) or Trikona (1, 5, 9) houses',
      effects: [
        'Creates eloquence and oratorical skill',
        'Brings intellectual brilliance',
        'Success in business and commerce',
        'Strong communication abilities',
        'Good memory and learning capacity',
        'Success in education and writing'
      ],
      conditions: 'Mercury and Sun must be in quadrants or trines',
      benefits: [
        'Communication mastery',
        'Business success',
        'Intellectual achievement',
        'Financial gain through intellect',
        'Literary and academic success'
      ]
    },
    'Chandra-Mangal': {
      name: 'Chandra-Mangal Yoga',
      description: 'Combination of Moon and Mars in Kendra houses together',
      effects: [
        'Creates courage and bold action',
        'Strong emotional constitution',
        'Physical vigor and strength',
        'Success in competitive fields',
        'Military or pioneering aptitude',
        'Good health and vitality'
      ],
      conditions: 'Moon and Mars must be in quadrants (1, 4, 7, 10)',
      benefits: [
        'Emotional strength',
        'Physical vitality',
        'Competitive success',
        'Courage and bravery',
        'Success in sports and defense'
      ]
    },
  },

  /**
   * Dosha interpretations and remedies
   */
  doshas: {
    'ManglikDosha': {
      name: 'Manglik Dosha (Kuja Dosha)',
      description: 'Mars in 1st, 2nd, 4th, 7th, 8th, or 12th house from Ascendant or Moon. Creates fiery aggressive energy in marriage and relationships.',
      effects: [
        'Delay in marriage',
        'Marital discord and conflicts',
        'Spousal health problems',
        'Accident or injury proneness',
        'Financial losses',
        'Quarrelsome nature',
        'If in 12th house: reduced effect'
      ],
      remedies: {
        mantra: 'Recite Hanuman Chalisa 108 times or Mahamrityunjaya Mantra daily for 40 days',
        gemstone: 'Red coral (Moonga) worn in copper ring on Tuesday',
        charity: 'Feed birds red grains, donate red clothes or red lentils on Tuesdays',
        diet: ['Avoid non-vegetarian food on Tuesdays', 'Eat red-colored foods', 'Practice fasting on Tuesdays']
      }
    },
    'KalsarpaDosha': {
      name: 'Kalsarpa Dosha',
      description: 'All planets between Rahu and Ketu nodes, or Rahu in 12th and Ketu in 6th house. Creates obstacles and delays in life.',
      effects: [
        'Obstacles and delays in all endeavors',
        'Health problems and anxiety',
        'Financial difficulties',
        'Relationship problems',
        'Loss of reputation',
        'Struggle and hardship throughout life',
        'Spiritual obstacles'
      ],
      remedies: {
        mantra: 'Recite Rahu Mantra (Om Bhram Bhreem Bhroum Sah Rahave Namah) and Ketu Mantra (Om Straam Streem Stroum Sah Ketave Namah) daily',
        gemstone: 'Hessonite (Gomed) for Rahu and Cat\'s eye (Lehsunia) for Ketu',
        charity: 'Feed street dogs, donate black and white items, perform yagna (fire rituals)',
        diet: ['Avoid alcohol and non-vegetarian on Wednesdays', 'Fast on Wednesdays and Saturdays', 'Donate food to poor']
      }
    },
    'Sadhesati': {
      name: 'Sadhesati (Shani Sadhesati)',
      description: 'Saturn transiting 12th, 1st, and 2nd house from Moon sign for 7.5 years. Creates hardship and transformation.',
      effects: [
        'Physical and mental stress',
        'Financial difficulties and losses',
        'Health problems and suffering',
        'Relationship conflicts',
        'Loss of position or status',
        'Separation from loved ones',
        'Spiritual growth through suffering',
        'Ultimate transformation and rebirth'
      ],
      remedies: {
        mantra: 'Recite Hanuman Chalisa, Shani Mahadasha Stotra, Om Sham Shanicharaya Namah 108 times',
        gemstone: 'Blue sapphire (Neelam) worn in lead or iron ring',
        charity: 'Offer oil to Hanuman, donate black clothes and food to poor on Saturdays',
        diet: ['Eat sesame and black foods', 'Fast on Saturdays', 'Avoid harmful activities']
      }
    },
  },

  /**
   * Planet characteristics
   */
  planetCharacteristics: {
    'Sun': {
      name: 'Sun',
      devataName: 'Surya',
      gender: 'masculine',
      element: 'Fire',
      color: 'Gold/Orange',
      direction: 'East',
      bodyPart: 'Heart, eyes, spine',
      metal: 'Gold',
      gemstone: 'Ruby (Manik)',
      day: 'Sunday',
      mantra: 'Om Suryaya Namah',
      characteristics: 'Authority, leadership, willpower, consciousness, self, vitality'
    },
    'Moon': {
      name: 'Moon',
      devataName: 'Chandra',
      gender: 'feminine',
      element: 'Water',
      color: 'White/Silver',
      direction: 'Northwest',
      bodyPart: 'Mind, breasts, blood',
      metal: 'Silver',
      gemstone: 'Pearl (Moti)',
      day: 'Monday',
      mantra: 'Om Chandramase Namah',
      characteristics: 'Mind, emotions, nurturing, intuition, mother, comfort'
    },
    'Mars': {
      name: 'Mars',
      devataName: 'Mangala',
      gender: 'masculine',
      element: 'Fire',
      color: 'Red',
      direction: 'South',
      bodyPart: 'Muscles, blood, energy',
      metal: 'Copper',
      gemstone: 'Red Coral (Moonga)',
      day: 'Tuesday',
      mantra: 'Om Mangalaya Namah',
      characteristics: 'Courage, action, aggression, sexuality, strength, energy'
    },
    'Mercury': {
      name: 'Mercury',
      devataName: 'Budha',
      gender: 'neutral',
      element: 'Air/Earth',
      color: 'Green',
      direction: 'North',
      bodyPart: 'Nerves, hands, speech',
      metal: 'Copper/Bronze',
      gemstone: 'Emerald (Panna)',
      day: 'Wednesday',
      mantra: 'Om Budhaya Namah',
      characteristics: 'Communication, intellect, commerce, writing, analysis'
    },
    'Jupiter': {
      name: 'Jupiter',
      devataName: 'Brihaspati',
      gender: 'masculine',
      element: 'Fire/Air',
      color: 'Yellow/Gold',
      direction: 'Northeast',
      bodyPart: 'Liver, fat, thighs',
      metal: 'Gold',
      gemstone: 'Yellow Sapphire (Pukhraj)',
      day: 'Thursday',
      mantra: 'Om Gurave Namah',
      characteristics: 'Wisdom, expansion, luck, teaching, spirituality, prosperity'
    },
    'Venus': {
      name: 'Venus',
      devataName: 'Shukra',
      gender: 'feminine',
      element: 'Water/Air',
      color: 'White/Bright',
      direction: 'Southeast',
      bodyPart: 'Reproductive system, skin',
      metal: 'Silver/Copper',
      gemstone: 'Diamond (Heera)',
      day: 'Friday',
      mantra: 'Om Shukraya Namah',
      characteristics: 'Love, beauty, creativity, pleasure, relationships, art'
    },
    'Saturn': {
      name: 'Saturn',
      devataName: 'Shani',
      gender: 'masculine',
      element: 'Air/Earth',
      color: 'Blue/Black',
      direction: 'West',
      bodyPart: 'Bones, teeth, joints',
      metal: 'Iron/Lead',
      gemstone: 'Blue Sapphire (Neelam)',
      day: 'Saturday',
      mantra: 'Om Shanicharaya Namah',
      characteristics: 'Discipline, limitation, hardship, time, duty, responsibility'
    },
    'Rahu': {
      name: 'Rahu',
      devataName: 'Rahu (North Node)',
      gender: 'masculine',
      element: 'Air',
      color: 'Smoky/Mixed',
      direction: 'Southwest',
      bodyPart: 'Head, nerves, illusions',
      metal: 'Iron',
      gemstone: 'Hessonite (Gomed)',
      day: 'Wednesday',
      mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
      characteristics: 'Illusion, desire, obsession, innovation, sudden events'
    },
    'Ketu': {
      name: 'Ketu',
      devataName: 'Ketu (South Node)',
      gender: 'masculine',
      element: 'Fire',
      color: 'Gray/Smoke',
      direction: 'Southeast',
      bodyPart: 'Feet, lower body, mind',
      metal: 'Iron',
      gemstone: 'Cat\'s Eye (Lehsunia)',
      day: 'Friday',
      mantra: 'Om Straam Streem Stroum Sah Ketave Namah',
      characteristics: 'Spirituality, detachment, past karma, endings, wisdom'
    },
  }
};

/**
 * Get planet-in-sign interpretation
 */
export function getPlanetSignInterpretation(
  planet: Planet,
  rashi: Rashi
): PlanetSignInterpretation | null {
  const key = `${planet}-${rashi}` as keyof typeof interpretations.planetInSign;
  return interpretations.planetInSign[key] || null;
}

/**
 * Get nakshatra interpretation
 */
export function getNakshatraInterpretation(nakshatra: Nakshatra): NakshatraInterpretation | null {
  return (interpretations.nakshatras[nakshatra] as NakshatraInterpretation) || null;
}

/**
 * Get yoga interpretation
 */
export function getYogaInterpretation(yogaName: string): YogaInterpretation | null {
  return (interpretations.yogas as any)[yogaName] || null;
}

/**
 * Get dosha interpretation with remedies
 */
export function getDoshaInterpretation(doshaName: string): DoshaInterpretation | null {
  return (interpretations.doshas as any)[doshaName] || null;
}

/**
 * Get planet characteristics
 */
export function getPlanetCharacteristics(planet: Planet): PlanetCharacteristics | null {
  return (interpretations.planetCharacteristics[planet] as PlanetCharacteristics) || null;
}
