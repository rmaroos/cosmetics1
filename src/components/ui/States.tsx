import React from 'react';
import { twMerge } from 'tailwind-merge';
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from './Button';

export function Skeleton({ className }: {className?: string;}) {
  return <div className={twMerge('animate-pulse rounded-md bg-[#F1EDEB]', className)} aria-hidden="true" />;
}

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={twMerge('mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center', className)}>
      {icon && <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-pale text-brand">{icon}</div>}
      <h2 className="font-display text-3xl leading-tight text-ink">{title}</h2>
      {description && <p className="mt-2 text-ink-2">{description}</p>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>);

}

export function ErrorState({ message, onRetry, className }: {message?: string;onRetry?: () => void;className?: string;}) {
  return (
    <div className={twMerge('mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center', className)} role="alert">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-error-soft text-error">
        <AlertTriangleIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="font-display text-3xl text-ink">We couldn’t load this</h2>
      <p className="mt-2 text-ink-2">{message ?? 'Something went wrong on our side. Please try again.'}</p>
      {onRetry &&
      <Button variant="secondary" className="mt-6" onClick={onRetry}>
          <RefreshCwIcon className="h-4 w-4" aria-hidden="true" /> Try again
        </Button>
      }
    </div>);

}

type AlertProps = {tone: 'success' | 'error' | 'warning' | 'info';title?: string;children: React.ReactNode;className?: string;};

const tones = {
  success: 'bg-success-soft text-success border-success/20',
  error: 'bg-error-soft text-error border-error/20',
  warning: 'bg-warning-soft text-warning border-warning/20',
  info: 'bg-info-soft text-info border-info/20'
};

export function Alert({ tone, title, children, className }: AlertProps) {
  return (
    <div className={twMerge('rounded-lg border px-4 py-3 text-sm', tones[tone], className)} role={tone === 'error' ? 'alert' : 'status'}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={twMerge(title && 'mt-0.5', 'text-ink-2 [&_strong]:text-ink')}>{children}</div>
    </div>);

}