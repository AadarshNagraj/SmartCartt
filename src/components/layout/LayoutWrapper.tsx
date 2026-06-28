"use client";

import React, { ReactNode } from 'react';
import { SkipToContent } from '../common/SkipToContent/SkipToContent';
import { AnnouncementBar } from './AnnouncementBar/AnnouncementBar';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { MobileNav } from './MobileNav/MobileNav';
import { SearchProvider } from './Search/SearchProvider';
import { SearchOverlay } from './Search/SearchOverlay';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <SkipToContent />
      <AnnouncementBar />
      <Header />
      <SearchOverlay />
      <main id="main-content" tabIndex={-1} style={{ outline: 'none', flex: 1 }}>
        {children}
      </main>
      <Footer />
      <MobileNav />
    </SearchProvider>
  );
}
