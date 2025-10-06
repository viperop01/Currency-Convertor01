import CurrencyConverter from '@/components/CurrencyConverter';
import BackgroundGraphics from '@/components/BackgroundGraphics';
import { DollarSign, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <BackgroundGraphics />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 shadow-[var(--shadow-elegant)] backdrop-blur-sm border border-primary/10 animate-pulse-glow">
            <DollarSign className="h-10 w-10 text-primary" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">Currency Exchange</h1>
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Convert currencies instantly with real-time exchange rates from around the world</p>
        </header>

        <div className="flex justify-center items-center">
          <CurrencyConverter />
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Exchange rates are updated in real-time and provided by open.er-api.com</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;


