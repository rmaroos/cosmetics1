import React, { useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

type FieldShellProps = {
  label: string;
  id: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function FieldShell({ label, id, required, optional, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-error" aria-hidden="true"> *</span>}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error &&
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      }
      {error &&
      <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-error" role="alert">
          <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      }
    </div>);

}

export const inputClass =
'block w-full rounded-lg border bg-white px-3.5 h-11 text-[15px] text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand disabled:bg-surface';

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  containerClassName?: string;
};

export function TextField({ label, hint, error, optional, required, containerClassName, className, type, ...rest }: TextFieldProps) {
  const id = useId();
  const [reveal, setReveal] = useState(false);
  const isPassword = type === 'password';
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell label={label} id={id} required={required} optional={optional} hint={hint} error={error} className={containerClassName}>
      <div className="relative">
        <input
          id={id}
          type={isPassword && reveal ? 'text' : type}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={twMerge(inputClass, error ? 'border-error' : 'border-line', isPassword && 'pr-12', className)}
          {...rest} />
        
        {isPassword &&
        <button
          type="button"
          onClick={() => setReveal((r) => !r)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink-muted hover:text-ink"
          aria-label={reveal ? 'Hide password' : 'Show password'}>
          
            {reveal ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        }
      </div>
    </FieldShell>);

}

type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  containerClassName?: string;
};

export function TextArea({ label, hint, error, optional, required, containerClassName, className, ...rest }: TextAreaProps) {
  const id = useId();
  return (
    <FieldShell label={label} id={id} required={required} optional={optional} hint={hint} error={error} className={containerClassName}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={twMerge(inputClass, 'h-auto min-h-[120px] py-3 leading-relaxed', error ? 'border-error' : 'border-line', className)}
        {...rest} />
      
    </FieldShell>);

}

type SelectFieldProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  options: {value: string;label: string;}[];
  placeholder?: string;
  containerClassName?: string;
};

export function SelectField({ label, hint, error, optional, required, options, placeholder, containerClassName, className, ...rest }: SelectFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} id={id} required={required} optional={optional} hint={hint} error={error} className={containerClassName}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={twMerge(inputClass, 'appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10', error ? 'border-error' : 'border-line', className)}
        style={{
          backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2368666A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"
        }}
        {...rest}>
        
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) =>
        <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )}
      </select>
    </FieldShell>);

}

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: React.ReactNode;
  description?: string;
  error?: string;
};

export function Checkbox({ label, description, error, className, ...rest }: CheckboxProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-line accent-[#A2626A]"
          aria-invalid={error ? true : undefined}
          {...rest} />
        
        <span className="text-sm leading-snug text-ink">
          {label}
          {description && <span className="mt-0.5 block text-xs text-ink-muted">{description}</span>}
        </span>
      </label>
      {error &&
      <p className="mt-1.5 pl-7 text-xs font-medium text-error" role="alert">
          {error}
        </p>
      }
    </div>);

}