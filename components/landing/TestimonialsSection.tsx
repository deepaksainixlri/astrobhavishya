'use client';

import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer, Delhi',
    image: '👩‍💼',
    text: "AstroBhavishya helped me understand my career path. The dasha analysis was spot-on and guided my job transition perfectly. It's like having a personal astrologer!",
    rating: 5,
  },
  {
    name: 'Arun Kumar',
    role: 'Business Owner, Mumbai',
    image: '👨‍💼',
    text: 'The compatibility matching feature saved my relationship. The insights helped me understand my partner better and we moved forward with clarity and confidence.',
    rating: 5,
  },
  {
    name: 'Ananya Desai',
    role: 'Student, Bangalore',
    image: '👩‍🎓',
    text: 'The daily horoscope is incredibly accurate! I check it every morning and it helps me plan my day better. This app is a game-changer for understanding myself.',
    rating: 5,
  },
  {
    name: 'Rajesh Patel',
    role: 'Finance Professional, Ahmedabad',
    image: '👨‍💻',
    text: 'The career and finance predictions helped me make critical investment decisions. The gemstone recommendations have also brought positive changes in my life.',
    rating: 5,
  },
  {
    name: 'Neha Singh',
    role: 'Content Creator, Pune',
    image: '👩‍🎨',
    text: 'The remedy suggestions and gemstone guidance actually work! I saw noticeable improvements in my life after following the recommendations. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Vikram Nair',
    role: 'Entrepreneur, Kochi',
    image: '👨‍🚀',
    text: "This is the most affordable and accurate astrology service I've used. For ₹99, getting a Kundli that usually costs ₹500+ is incredible value.",
    rating: 5,
  },
];

const trustStats = [
  { value: '500K+', label: 'Active Users' },
  { value: '2.5M+', label: 'Reports Generated' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '97%', label: 'Satisfaction' },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#FFFFF7' }}
    >
      {/* Subtle warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-transparent to-amber-50/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Loved by Thousands
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Real stories from real people who transformed their lives with
            cosmic insights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-3d bg-white rounded-2xl shadow-depth p-8 transition-shadow duration-500 hover:shadow-depth-lg"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-depth p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
