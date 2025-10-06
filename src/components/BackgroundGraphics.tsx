import { DollarSign, Euro, Bitcoin, TrendingUp } from 'lucide-react';

const BackgroundGraphics = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 opacity-60" style={{ background: 'var(--gradient-mesh)' }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="absolute top-20 left-[10%] text-primary/10 animate-float">
        <DollarSign className="h-24 w-24" />
      </div>
      <div className="absolute top-40 right-[15%] text-accent/10 animate-float-delayed">
        <Euro className="h-32 w-32" />
      </div>
      <div className="absolute bottom-40 left-[20%] text-primary-glow/10 animate-float">
        <Bitcoin className="h-28 w-28" />
      </div>
      <div className="absolute bottom-20 right-[10%] text-accent/10 animate-float-delayed">
        <TrendingUp className="h-24 w-24" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="absolute top-10 right-[30%] w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 left-[15%] w-3 h-3 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 right-[20%] w-2 h-2 bg-primary-glow/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 left-[40%] w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default BackgroundGraphics;


