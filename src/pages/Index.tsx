
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="loader">
            <div></div>
            <div></div>
          </div>
          <h2 className="text-xl font-semibold mt-4 animate-pulse">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="glass-card p-8">
            <UploadArea className="min-h-[300px]" />
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 FIS Contract Extractor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
