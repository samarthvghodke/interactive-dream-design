
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-4 border-b', className)}>
      <div className="container mx-auto flex items-center justify-center">
        <Link to="/" className="cursor-pointer">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-fis-primary to-fis-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            FIS Contract Extractor
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
