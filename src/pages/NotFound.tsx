import React from 'react';
import { CompassIcon } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Container } from '../components/layout/Container';
import { EmptyState } from '../components/ui/States';
import { Button } from '../components/ui/Button';

type Props = {title?: string;description?: string;};

export function NotFound({ title = 'We can’t find that page', description = 'It may have moved, or is no longer available. Try searching or browse our latest products.' }: Props) {
  useDocumentMeta('Page not found', description, { noindex: true });
  return (
    <Container className="py-16">
      <EmptyState
        icon={<CompassIcon className="h-6 w-6" />}
        title={title}
        description={description}
        action={
        <>
            <Button to="/shop">Shop all products</Button>
            <Button to="/" variant="secondary">
              Back to home
            </Button>
          </>
        } />
      
    </Container>);

}