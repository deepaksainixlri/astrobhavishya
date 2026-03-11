'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Card } from '../ui/Card';

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
    text: 'This is the most affordable and accurate astrology service I\'ve used. For ₹99, getting a Kundli that usually costs ₹500+ is incredible value.',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              Loved by Thousands
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real stories from real people who transformed their lives with cosmic insights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              variant="glass"
              className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="dark" className="p-6 text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">500K+</div>
            <p className="text-gray-400 text-sm">Active Users</p>
          </Card>
          <Card variant="dark" className="p-6 text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">2.5M+</div>
            <p className="text-gray-400 text-sm">Reports Generated</p>
          </Card>
          <Card variant="dark" className="p-6 text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">4.8★</div>
            <p className="text-gray-400 text-sm">Average Rating</p>
          </Card>
          <Card variant="dark" className="p-6 text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">97%</div>
            <p className="text-gray-400 text-sm">Satisfaction</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
