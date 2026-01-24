import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import StagingGate from '../components/StagingGate';

// Wrap the entire site with auth and staging gate
export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AuthProvider>
      <StagingGate>
        {children}
      </StagingGate>
    </AuthProvider>
  );
}
