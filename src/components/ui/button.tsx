import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'default' | 'outline';
type Size = 'default' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ className, variant = 'default', size = 'default', ...props }: PropsWithChildren<ButtonProps>) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variants: Record<Variant, string> = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    outline: 'border bg-transparent hover:bg-secondary'
  };
  const sizes: Record<Size, string> = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10'
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}


