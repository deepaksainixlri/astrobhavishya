'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Implement Supabase authentication
      console.log('Login attempt:', formData);
      // await signIn(formData.email, formData.password);
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-warm-ivory to-warm-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
            AstroBhavishya
          </h1>
          <p className="text-body-brown">Welcome back, cosmic seeker</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {error && (
            <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-dark-brown cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-saffron" />
              Remember me
            </label>
            <a href="#" className="text-saffron hover:text-saffron-light transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
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
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-6 text-body-brown">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-saffron hover:text-saffron-light transition font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
