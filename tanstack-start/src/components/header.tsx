import { Typography } from '@/components/ui/typography.tsx'
import React from 'react';
import { Link } from '@tanstack/react-router';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul className="flex gap-10 py-15 px-25 justify-end">
          <Typography asChild type="large">
            <li className="hover:underline"><Link to="/">Home</Link></li>
          </Typography>
          <li className="hover:underline"><Link to="/courses">Courses</Link></li>
          <li className="hover:underline"><Link to="/login">Login</Link></li>
          <li className="hover:underline"><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};