
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

// This is where you'll integrate your model results
interface ContractData {
  id: string;
  field: string;
  value: string;
}

const Results = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ContractData[]>([]);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // This is where you'll fetch data from your model
      // Replace this with your actual API call
      /*
      // YOUR MODEL INTEGRATION CODE GOES HERE
      fetch('YOUR_MODEL_API_ENDPOINT', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          setData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to load data. Please try again.');
          setIsLoading(false);
        });
      */
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
          <h2 className="text-xl font-semibold mt-4 animate-pulse">Processing contract...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 container mx-auto p-4 pt-8">
        <Card className="glass-card w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Contract Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <p className="text-destructive text-center">{error}</p>
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No data available yet.</p>
                <p className="text-sm text-muted-foreground">
                  This is where extracted contract data will appear.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.field}</TableCell>
                      <TableCell>{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-6 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <img 
            src="/fis-logo.svg" 
            alt="FIS Logo" 
            className="h-10 w-auto"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='32' viewBox='0 0 100 32'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='%231a365d'%3EFIS%3C/text%3E%3C/svg%3E";
            }}
          />
          <p className="text-sm text-muted-foreground">
            © 2025 FIS Contract Extractor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Results;
