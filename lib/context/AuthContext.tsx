'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient, isDemoMode } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  credits: number;
  subscription: 'free' | 'basic' | 'premium' | 'annual';
  birthProfiles: BirthProfileData[];
}

interface BirthProfileData {
  id: string;
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: number;
  gender: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  saveBirthProfile: (data: Omit<BirthProfileData, 'id'>) => Promise<BirthProfileData>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for when Supabase isn't configured
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'demo@astrobhavishya.com',
  app_metadata: {},
  user_metadata: { full_name: 'Demo User' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

const DEMO_PROFILE: UserProfile = {
  id: 'demo-user-001',
  email: 'demo@astrobhavishya.com',
  fullName: 'Demo User',
  credits: 5,
  subscription: 'free',
  birthProfiles: [],
};

// Local storage keys
const STORAGE_KEYS = {
  user: 'astro_user',
  profile: 'astro_profile',
  birthProfiles: 'astro_birth_profiles',
  reports: 'astro_reports',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemo = isDemoMode();

  // Load saved state from localStorage
  useEffect(() => {
    if (isDemo) {
      const savedUser = localStorage.getItem(STORAGE_KEYS.user);
      const savedProfile = localStorage.getItem(STORAGE_KEYS.profile);
      if (savedUser && savedProfile) {
        setUser(JSON.parse(savedUser));
        setProfile(JSON.parse(savedProfile));
      }
      setLoading(false);
      return;
    }

    // Real Supabase auth
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [isDemo]);

  const loadProfile = async (userId: string) => {
    if (isDemo) return;
    const supabase = createClient();
    if (!supabase) return;

    const { data } = await supabase
      .from('profiles')
      .select('*, birth_profiles(*)')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile({
        id: data.id,
        email: data.email || '',
        fullName: data.full_name || '',
        credits: data.credits || 0,
        subscription: data.subscription_tier || 'free',
        birthProfiles: (data.birth_profiles || []).map((bp: any) => ({
          id: bp.id,
          name: bp.name,
          dateOfBirth: bp.date_of_birth,
          timeOfBirth: bp.time_of_birth,
          placeOfBirth: bp.place_of_birth,
          latitude: bp.latitude,
          longitude: bp.longitude,
          timezone: bp.timezone_offset,
          gender: bp.gender,
          isDefault: bp.is_default,
        })),
      });
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    if (isDemo) {
      const demoUser = { ...DEMO_USER, email };
      const demoProfile = { ...DEMO_PROFILE, email, fullName: email.split('@')[0] };

      // Load saved birth profiles
      const savedProfiles = localStorage.getItem(STORAGE_KEYS.birthProfiles);
      if (savedProfiles) {
        demoProfile.birthProfiles = JSON.parse(savedProfiles);
      }

      setUser(demoUser);
      setProfile(demoProfile);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(demoUser));
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(demoProfile));
      return {};
    }

    const supabase = createClient();
    if (!supabase) return { error: 'Supabase not configured' };

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  }, [isDemo]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    if (isDemo) {
      const demoUser = { ...DEMO_USER, email, user_metadata: { full_name: fullName } };
      const demoProfile = { ...DEMO_PROFILE, email, fullName, credits: 3 };

      setUser(demoUser);
      setProfile(demoProfile);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(demoUser));
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(demoProfile));
      return {};
    }

    const supabase = createClient();
    if (!supabase) return { error: 'Supabase not configured' };

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    return {};
  }, [isDemo]);

  const signOut = useCallback(async () => {
    if (isDemo) {
      setUser(null);
      setProfile(null);
      localStorage.removeItem(STORAGE_KEYS.user);
      localStorage.removeItem(STORAGE_KEYS.profile);
      return;
    }

    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [isDemo]);

  const saveBirthProfile = useCallback(async (data: Omit<BirthProfileData, 'id'>) => {
    const newProfile: BirthProfileData = {
      ...data,
      id: `bp_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };

    if (isDemo) {
      const updatedProfile = profile ? { ...profile } : { ...DEMO_PROFILE };
      updatedProfile.birthProfiles = [...(updatedProfile.birthProfiles || []), newProfile];
      setProfile(updatedProfile);
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(updatedProfile));
      localStorage.setItem(STORAGE_KEYS.birthProfiles, JSON.stringify(updatedProfile.birthProfiles));
      return newProfile;
    }

    const supabase = createClient();
    if (!supabase) return newProfile;

    const { data: saved, error } = await supabase.from('birth_profiles').insert({
      user_id: user?.id,
      name: data.name,
      date_of_birth: data.dateOfBirth,
      time_of_birth: data.timeOfBirth,
      place_of_birth: data.placeOfBirth,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone_offset: data.timezone,
      gender: data.gender,
      is_default: data.isDefault,
    }).select().single();

    if (saved) newProfile.id = saved.id;
    await loadProfile(user!.id);
    return newProfile;
  }, [isDemo, profile, user]);

  const refreshProfile = useCallback(async () => {
    if (user && !isDemo) {
      await loadProfile(user.id);
    }
  }, [user, isDemo]);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isDemo,
      signIn,
      signUp,
      signOut,
      saveBirthProfile,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
