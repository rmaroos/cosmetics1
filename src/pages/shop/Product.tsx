import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAsync } from '../../hooks/useAsync';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { fetchProduct, NotFoundError } from '../../utils/api';
import { getBrandById, getCategoryPath, getCategoryUrl, getDisplayPrice, getPrimaryCategory, getRelatedProducts, isInStock } from '../../utils/catalog';
import { formatPrice } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { ProductGallery } from '../../components/pdp/ProductGallery';
import { PurchasePanel } from '../../components/pdp/PurchasePanel';
import { ProductDetails } from '../../components/pdp/ProductDetails';
import { ProductRail } from '../../components/product/ProductRail';
import { Button } from '../../components/ui/Button';
import { ErrorState, Skeleton } from '../../components/ui/States';
import { NotFound } from '../NotFound';

export function Product() {
  const { slug = '' } = useParams();
  const state = useAsync(() => fetchProduct(slug), [slug]);
  const product = state.status === 'success' ? state.data : undefined;
  const brand = product ? getBrandById(product.brandId) : undefined;
  const [sticky, setSticky] = useState(false);
  const addRef = useRef<() => void>(() => undefined);
  const registerAdd = useCallback((fn: () => void) => {
    addRef.current = fn;
  }, []);

  useDocumentMeta(product ? `${product.name} by ${brand?.name ?? ''}` : 'Product', product?.shortDescription);

  // Structured data for search engines.
  useEffect(() => {
    if (!product) return;
    const { price } = getDisplayPrice(product);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images,
      description: product.shortDescription,
      brand: brand ? { '@type': 'Brand', name: brand.name } : undefined,
      offers: { '@type': 'Offer', priceCurrency: 'LKR', price, availability: isInStock(product) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' }
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [product, brand]);

  useEffect(() => setSticky(false), [slug]);

  if (state.status === 'loading') {
    return (
      <Container className="pb-16 pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16" aria-busy="true" aria-label="Loading product">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Container>);

  }

  if (state.status === 'error') {
    if (state.error === new NotFoundError('Product not found').message) {
      return <NotFound title="This product isn’t available" description="It may have been discontinued or is no longer published. Explore similar products in our shop." />;
    }
    return <ErrorState message={state.error} onRetry={state.retry} />;
  }

  if (!product) return null;
  const category = getPrimaryCategory(product);
  const crumbs = [
  ...(category ? getCategoryPath(category).map((c) => ({ label: c.name, to: getCategoryUrl(c) })) : []),
  { label: product.name }];

  const related = getRelatedProducts(product);
  const { price } = getDisplayPrice(product);

  return (
    <>
      <Container className="pb-16">
        <Breadcrumbs items={crumbs} />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <PurchasePanel key={product.id} product={product} brand={brand} onStickyChange={setSticky} registerAdd={registerAdd} />
        </div>
        <div className="mt-16 border-t border-line pt-12 md:mt-20 md:pt-16">
          <ProductDetails product={product} />
        </div>
      </Container>
      <div className="border-t border-line">
        <ProductRail title="You may also like" products={related} />
      </div>

      <AnimatePresence>
        {sticky && isInStock(product) &&
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:hidden">
          
            <Container className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{product.name}</p>
                <p className="text-sm tabular-nums text-ink-2">{formatPrice(price)}</p>
              </div>
              <Button onClick={() => addRef.current()}>Add to bag</Button>
            </Container>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}