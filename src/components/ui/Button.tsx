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
'type-button inline-flex cursor-pointer items-center justify-center gap-2 rounded-full whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:border-transparent disabled:bg-disabled disabled:text-disabled-text disabled:shadow-none';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover',
  dark: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover',
  secondary: 'border border-brand bg-transparent text-brand hover:bg-brand-soft active:bg-brand-soft',
  ghost: 'text-brand hover:bg-brand-soft',
  destructive: 'border border-error/30 text-error hover:bg-error-soft'
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5',
  md: 'h-11 px-6',
  lg: 'h-12 px-8'
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