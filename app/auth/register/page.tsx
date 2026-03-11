'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, Calendar, MapPin } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    placeOfBirth: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement Supabase registration
      console.log('Registration attempt:', formData);
      // await signUp(formData);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-warm-ivory to-warm-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
            AstroBhavishya
          </h1>
          <p className="text-body-brown">Begin your cosmic journey</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && (
            <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-dark-brown mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-saffron/50" />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full pl-10 px-4 py-2 bg-white border-2 border-saffron/30 text-dark-brown rounded-lg focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20 placeholder-body-brown/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-brown mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-saffron/50" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full pl-10 px-4 py-2 bg-white border-2 border-saffron/30 text-dark-brown rounded-lg focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20 placeholder-body-brown/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-dark-brown mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-saffron/50" />
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full pl-10 px-4 py-2 bg-white border-2 border-saffron/30 text-dark-brown rounded-lg focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="placeOfBirth" className="block text-sm font-medium text-dark-brown mb-2">
              Place of Birth
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-saffron/50" />
              <input
                id="placeOfBirth"
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                placeholder="City, Country"
                required
                className="w-full pl-10 px-4 py-2 bg-white border-2 border-saffron/30 text-dark-brown rounded-lg focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20 placeholder-body-brown/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-brown mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-saffron/50" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 px-4 py-2 bg-white border-2 border-saffron/30 text-dark-brown rounded-lg focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20 placeholder-body-brown/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-body-brown hover:text-saffron transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-brown mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-saffron/50" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 px-4 py-2 bg-white border-2 border-saffron/30 text-dark-brown rounded-lg focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20 placeholder-body-brown/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-body-brown hover:text-saffron transition"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-dark-brown cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-1 rounded border-saffron"
            />
            <span>
              I agree to the{' '}
              <a href="#" className="text-saffron hover:text-saffron-light transition">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-saffron hover:text-saffron-light transition">
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-saffron/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-body-brown">or</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-outline w-full"
          >
            Sign up with Google
          </button>
        </form>

        <p className="text-center mt-6 text-body-brown">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-saffron hover:text-saffron-light transition font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
