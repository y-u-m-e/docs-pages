import React from 'react';
import StagingBanner from '../components/StagingBanner';

// Wrap the entire site with the staging banner
export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <StagingBanner />
      {children}
    </>
  );
}
