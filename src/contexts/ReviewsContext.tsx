import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { SubmittedReview } from '../types/commerce';
import { createId, readStorage, wait, writeStorage } from '../utils/storage';

type SubmitInput = Omit<SubmittedReview, 'id' | 'createdAt' | 'status'>;

type ReviewsValue = {
  submitted: SubmittedReview[];
  submitReview: (input: SubmitInput) => Promise<{ok: true;} | {ok: false;error: string;}>;
  reviewsBy: (customerId: string) => SubmittedReview[];
  hasReviewed: (customerId: string, productId: string) => boolean;
};

const ReviewsContext = createContext<ReviewsValue | null>(null);

export function ReviewsProvider({ children }: {children: React.ReactNode;}) {
  const [submitted, setSubmitted] = useState<SubmittedReview[]>(() => readStorage<SubmittedReview[]>('reviews', []));
  useEffect(() => writeStorage('reviews', submitted), [submitted]);

  const submitReview = useCallback<ReviewsValue['submitReview']>(async (input) => {
    await wait(800);
    if (!navigator.onLine) return { ok: false, error: 'We couldn’t submit your review. Check your connection and try again.' };
    // New reviews always enter moderation before publication.
    setSubmitted((prev) => [{ ...input, id: createId('rev'), createdAt: new Date().toISOString(), status: 'pending' }, ...prev]);
    return { ok: true };
  }, []);

  const reviewsBy = useCallback((id: string) => submitted.filter((r) => r.customerId === id), [submitted]);
  const hasReviewed = useCallback(
    (customerId: string, productId: string) => submitted.some((r) => r.customerId === customerId && r.productId === productId),
    [submitted]
  );

  const value = useMemo(() => ({ submitted, submitReview, reviewsBy, hasReviewed }), [submitted, submitReview, reviewsBy, hasReviewed]);
  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews(): ReviewsValue {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider');
  return ctx;
}