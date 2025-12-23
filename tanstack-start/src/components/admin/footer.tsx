import { Typography } from '@/components/ui/typography.tsx'
import React from 'react';
export const Footer: React.FC = () => {
  return (
    <footer className="flex w-full bg-gray-100 mt-auto justify-center px-25 py-15">
      <Typography type="p">© 2025 My School Platform</Typography>
    </footer>
  );
};