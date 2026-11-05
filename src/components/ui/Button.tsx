import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Loader2Icon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {to?: undefined;};
type LinkProps = CommonProps & {to: string;onClick?: () => void;'aria-label'?: string;};

const base =
'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-hover',
  dark: 'bg-ink text-white hover:bg-black',
  secondary: 'border border-line bg-white text-ink hover:border-ink',
  ghost: 'text-ink hover:bg-surface',
  destructive: 'border border-error/30 text-error hover:bg-error-soft'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]'
};

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', loading, fullWidth, className, children } = props;
  const classes = twMerge(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} aria-label={props['aria-label']} className={classes}>
        {children}
      </Link>);

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, loading: _l, fullWidth: _f, className: _c, children: _ch, to: _t, disabled, ...rest } = props as ButtonProps;
  return (
    <button {...rest} disabled={disabled || loading} aria-busy={loading || undefined} className={classes}>
      {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>);

}