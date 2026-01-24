/**
 * =============================================================================
 * STAGING GATE - Authorization for Preview/Staging Environments
 * =============================================================================
 * 
 * Wraps the app to require developer access on staging/preview URLs.
 * Production URLs bypass this check.
 */

import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface StagingGateProps {
  children: ReactNode;
}

// Check if current URL is a staging/preview environment
function isStaging(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return (
    hostname.includes('.pages.dev') ||
    hostname.includes('staging.') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1'
  );
}

// Handle auth token from URL (for .pages.dev OAuth callbacks)
function handleUrlToken() {
  if (typeof window === 'undefined') return;
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('auth_token');
  if (urlToken) {
    // Store in localStorage for the AuthContext to pick up
    localStorage.setItem('staging_auth_token', urlToken);
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
  }
}

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  } as React.CSSProperties,
  card: {
    maxWidth: '400px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  } as React.CSSProperties,
  iconAmber: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  } as React.CSSProperties,
  iconRed: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#fff',
  } as React.CSSProperties,
  text: {
    color: '#888',
    marginBottom: '24px',
  } as React.CSSProperties,
  textSmall: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '24px',
  } as React.CSSProperties,
  textXs: {
    fontSize: '12px',
    color: '#666',
    marginTop: '16px',
  } as React.CSSProperties,
  button: {
    width: '100%',
    padding: '12px 24px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,
  buttonOutline: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  } as React.CSSProperties,
  banner: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: '#f59e0b',
    color: '#000',
    textAlign: 'center' as const,
    padding: '4px 16px',
    fontSize: '12px',
    fontWeight: 500,
  } as React.CSSProperties,
  loader: {
    width: '32px',
    height: '32px',
    border: '3px solid #333',
    borderTop: '3px solid #7c3aed',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  } as React.CSSProperties,
  username: {
    fontWeight: 500,
    color: '#fff',
  } as React.CSSProperties,
};

// Spinner keyframes (injected via style tag)
const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function StagingGate({ children }: StagingGateProps) {
  const { user, loading, isAdmin, hasPermission, login } = useAuth();
  
  // Handle URL token on mount
  useEffect(() => {
    if (isStaging()) {
      handleUrlToken();
    }
  }, []);
  
  // Production - no gate needed
  if (!isStaging()) {
    return <>{children}</>;
  }

  // Loading auth state
  if (loading) {
    return (
      <>
        <style>{spinnerStyles}</style>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.loader} />
            <p style={styles.text}>Checking authorization...</p>
          </div>
        </div>
      </>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{...styles.iconContainer, ...styles.iconAmber}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 style={styles.title}>Staging Environment</h1>
          <p style={styles.text}>
            This is a preview/staging deployment. Please sign in with developer access to continue.
          </p>
          <button style={styles.button} onClick={login}>
            Sign in with Discord
          </button>
          <p style={styles.textXs}>
            Only users with DevOps access can view staging environments.
          </p>
        </div>
      </div>
    );
  }

  // Check for developer permission
  const canAccessStaging = isAdmin || hasPermission('view_devops');

  if (!canAccessStaging) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{...styles.iconContainer, ...styles.iconRed}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 style={styles.title}>Access Denied</h1>
          <p style={styles.text}>
            You don't have permission to access the staging environment.
          </p>
          <p style={styles.textSmall}>
            Signed in as: <span style={styles.username}>{user.global_name || user.username}</span>
          </p>
          <a href="https://docs.emuy.gg" style={styles.buttonOutline}>
            Go to Production Site
          </a>
        </div>
      </div>
    );
  }

  // Authorized - show staging banner and content
  return (
    <>
      {/* Staging Banner */}
      <div style={styles.banner}>
        🚧 STAGING ENVIRONMENT - Changes here won't affect production
      </div>
      <div style={{ paddingTop: '24px' }}>
        {children}
      </div>
    </>
  );
}
