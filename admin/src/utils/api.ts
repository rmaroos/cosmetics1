import type { Product } from '../types/catalog';
import { wait } from './storage';
import { getProductBySlug } from './catalog';

/**
 * Mock catalogue API. Simulates network latency so loading, error and retry
 * states behave as they will once the real backend is connected.
 */
const LATENCY = 260;

export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export async function fetchProducts(resolve: () => Product[]): Promise<Product[]> {
  await wait(LATENCY);
  if (!navigator.onLine) throw new Error('You appear to be offline. Check your connection and try again.');
  return resolve();
}

export async function fetchProduct(slug: string): Promise<Product> {
  await wait(LATENCY);
  if (!navigator.onLine) throw new Error('You appear to be offline. Check your connection and try again.');
  const product = getProductBySlug(slug);
  if (!product) throw new NotFoundError('Product not found');
  return product;
}