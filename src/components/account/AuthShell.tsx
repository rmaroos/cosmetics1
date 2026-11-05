import React from 'react';
import { img } from '../../data/images';
import { Container } from '../layout/Container';

export function AuthShell({ title, description, children }: {title: string;description?: string;children: React.ReactNode;}) {
  return (
    <Container className="py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto w-full max-w-md">
          <h1 className="font-display text-4xl text-ink md:text-5xl">{title}</h1>
          {description && <p className="mt-3 text-ink-2">{description}</p>}
          <div className="mt-8">{children}</div>
        </div>
        <div className="hidden overflow-hidden rounded-2xl lg:block">
          <img src={img.campaignSkincare} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </Container>);

}