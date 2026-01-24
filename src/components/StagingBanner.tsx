import React, { useEffect, useState } from 'react';

export default function StagingBanner(): JSX.Element | null {
  const [isStaging, setIsStaging] = useState(false);

  useEffect(() => {
    // Check if we're on a staging/preview URL
    const hostname = window.location.hostname;
    const staging = 
      hostname.includes('.pages.dev') || 
      hostname.includes('staging.') ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1';
    
    setIsStaging(staging);
    
    // Add class to html element for CSS targeting
    if (staging) {
      document.documentElement.classList.add('is-staging');
    }
    
    return () => {
      document.documentElement.classList.remove('is-staging');
    };
  }, []);

  if (!isStaging) {
    return null;
  }

  return (
    <div
      className="staging-banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#f59e0b',
        color: '#000',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      <span>🚧</span>
      <span>STAGING ENVIRONMENT - Changes here are for testing only</span>
      <span>🚧</span>
    </div>
  );
}
