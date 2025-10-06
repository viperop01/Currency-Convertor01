import { cn } from '@/lib/utils';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export function Card({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('rounded-lg bg-card text-card-foreground shadow-elegant border', className)} {...props} />;
}

export function CardHeader({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />;
}

export function CardDescription({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

export function CardContent({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}


