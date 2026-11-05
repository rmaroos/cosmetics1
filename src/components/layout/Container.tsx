import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Container({ children, className }: {children: React.ReactNode;className?: string;}) {
  return <div className={twMerge('mx-auto w-full max-w-container px-4 sm:px-6 lg:px-10', className)}>{children}</div>;
}