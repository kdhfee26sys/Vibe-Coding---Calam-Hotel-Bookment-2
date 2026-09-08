import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Building2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg-bg-gray-bg-secondary)',
          color: 'var(--color-text-text-gray-text-primary)',
          gap: '1.25rem'
        }}
        aria-busy="true"
        aria-label="Checking authentication status"
      >
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-bg-bg-color-bg-brand-solid)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(138, 93, 255, 0.25)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        >
          <Building2 size={32} color="#FFFFFF" />
        </div>
        <p style={{ 
          fontSize: '0.925rem', 
          fontWeight: 500, 
          color: 'var(--color-text-text-gray-text-secondary)',
          letterSpacing: '-0.01em'
        }}>
          Verifying session...
        </p>
      </div>
    );
  }

  if (!user) {
    // Preserve intended destination path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
