import type { Product } from '../types/catalog';
import { skincareProducts } from './skincareProducts';
import { beautyProducts } from './beautyProducts';

export const products: Product[] = [...skincareProducts, ...beautyProducts];