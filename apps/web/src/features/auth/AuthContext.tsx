import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '../../lib/supabase';

type AuthContextValue = { session: Session | null; loading: boolean; configured: boolean; signIn: (email: string, password: string) => Promise<{ error: string | null }>; signUp: (fullName: string, email: string, password: string) => Promise<{ error: string | null; confirmationRequired: boolean }>; signOut: () => Promise<void>; sendPasswordReset: (email: string) => Promise<{ error: string | null }>; updatePassword: (password: string) => Promise<{ error: string | null }> };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const unavailable = 'Configure as variáveis do Supabase para ativar a autenticação.';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!supabase) { setLoading(false); return; } let active = true; void supabase.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); setLoading(false); } }); const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession)); return () => { active = false; listener.subscription.unsubscribe(); }; }, []);
  const value = useMemo<AuthContextValue>(() => ({ session, loading, configured: supabaseConfigured, async signIn(email, password) { if (!supabase) return { error: unavailable }; const { error } = await supabase.auth.signInWithPassword({ email, password }); return { error: error?.message ?? null }; }, async signUp(fullName, email, password) { if (!supabase) return { error: unavailable, confirmationRequired: false }; const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } }); return { error: error?.message ?? null, confirmationRequired: Boolean(data.user && !data.session) }; }, async signOut() { if (supabase) await supabase.auth.signOut(); }, async sendPasswordReset(email) { if (!supabase) return { error: unavailable }; const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); return { error: error?.message ?? null }; }, async updatePassword(password) { if (!supabase) return { error: unavailable }; const { error } = await supabase.auth.updateUser({ password }); return { error: error?.message ?? null }; } }), [loading, session]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.'); return context; }
