import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { getConcern, getSkinType } from '../../utils/catalog';
import { Accordion } from '../ui/Accordion';

/** Shows only the information supplied for the product — nothing is invented when fields are missing. */
export function ProductDetails({ product }: {product: Product;}) {
  const types = product.skinTypes.map(getSkinType).filter(Boolean);
  const concerns = product.concerns.map(getConcern).filter(Boolean);
  const sku = product.variants.length === 1 ? product.variants[0].sku : null;

  return (
    <section aria-labelledby="details-heading" className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <h2 id="details-heading" className="font-display text-3xl text-ink md:text-4xl">About this product</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-2 md:text-base">{product.description}</p>
        {product.benefits && product.benefits.length > 0 &&
        <ul className="mt-6 space-y-2">
            {product.benefits.map((b) =>
          <li key={b} className="flex gap-3 text-[15px] text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {b}
              </li>
          )}
          </ul>
        }
      </div>
      <div className="border-t border-line">
        {product.howToUse &&
        <Accordion title="How to use" defaultOpen>
            <p>{product.howToUse}</p>
          </Accordion>
        }
        {(product.keyIngredients || product.ingredients) &&
        <Accordion title="Ingredients">
            {product.keyIngredients &&
          <p className="mb-3">
                <span className="font-medium text-ink">Key ingredients: </span>
                {product.keyIngredients.join(', ')}
              </p>
          }
            {product.ingredients &&
          <>
                <p className="mb-1 font-medium text-ink">Full ingredient list</p>
                <p className="text-sm">{product.ingredients}</p>
                <p className="mt-3 text-xs text-ink-muted">Ingredient lists may change. Please refer to the product packaging for the most up-to-date list.</p>
              </>
          }
          </Accordion>
        }
        {(types.length > 0 || concerns.length > 0) &&
        <Accordion title="Suitability">
            {types.length > 0 &&
          <div className="mb-3">
                <p className="mb-2 font-medium text-ink">Skin types</p>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => t &&
              <Link key={t.slug} to={`/skin-type/${t.slug}`} className="rounded-full border border-line px-3 py-1 text-sm text-ink hover:border-ink">{t.name}</Link>
              )}
                </div>
              </div>
          }
            {concerns.length > 0 &&
          <div>
                <p className="mb-2 font-medium text-ink">Formulated for</p>
                <div className="flex flex-wrap gap-2">
                  {concerns.map((c) => c &&
              <Link key={c.slug} to={`/skin-concern/${c.slug}`} className="rounded-full border border-line px-3 py-1 text-sm text-ink hover:border-ink">{c.name}</Link>
              )}
                </div>
              </div>
          }
            <p className="mt-4 text-xs text-ink-muted">Suitability is based on brand information and isn’t a guarantee of results.</p>
          </Accordion>
        }
        {product.warnings &&
        <Accordion title="Warnings & precautions">
            <p className="flex gap-2.5">
              <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
              {product.warnings}
            </p>
          </Accordion>
        }
        <Accordion title="Product details">
          <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
            <dt className="text-ink-muted">Type</dt>
            <dd className="text-ink">{product.productType}</dd>
            <dt className="text-ink-muted">{product.variantKind === 'Shade' ? 'Shades' : 'Sizes'}</dt>
            <dd className="text-ink">{product.variants.map((v) => v.label).join(', ')}</dd>
            {sku &&
            <>
                <dt className="text-ink-muted">SKU</dt>
                <dd className="text-ink">{sku}</dd>
              </>
            }
          </dl>
        </Accordion>
      </div>
    </section>);

}