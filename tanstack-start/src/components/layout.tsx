import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};