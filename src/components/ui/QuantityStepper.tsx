import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  value: number;
  max: number;
  min?: number;
  onChange: (value: number) => void;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
};

export function QuantityStepper({ value, max, min = 1, onChange, label = 'Quantity', size = 'md', disabled }: Props) {
  const h = size === 'sm' ? 'h-9' : 'h-11';
  const w = size === 'sm' ? 'w-9' : 'w-11';
  return (
    <div className={twMerge('inline-flex items-center rounded-lg border border-line bg-white', h)} role="group" aria-label={label}>
      <button
        type="button"
        className={twMerge('flex h-full items-center justify-center text-ink hover:bg-surface disabled:text-ink-muted/50 rounded-l-lg', w)}
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity">
        
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="min-w-[2.25rem] text-center text-sm font-medium tabular-nums" aria-live="polite" aria-label={`${label}: ${value}`}>
        {value}
      </span>
      <button
        type="button"
        className={twMerge('flex h-full items-center justify-center text-ink hover:bg-surface disabled:text-ink-muted/50 rounded-r-lg', w)}
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label="Increase quantity">
        
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>);

}