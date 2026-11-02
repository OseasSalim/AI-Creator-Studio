import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

export function ProtectedRoute() { const { session, loading } = useAuth(); const location = useLocation(); if (loading) return <div className="grid min-h-screen place-items-center bg-ink text-sm text-muted">Restaurando sua sessão...</div>; return session ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />; }
