
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-4 border-b', className)}>
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-fis-primary to-fis-accent bg-clip-text text-transparent">
          FIS Contract Extractor
        </h1>
      </div>
    </header>
  );
};

export default Header;
