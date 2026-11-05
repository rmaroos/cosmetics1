import React from 'react';
import { Accordion } from '../ui/Accordion';
import { filterKeys, filterLabels, type Facets, type FilterKey, type ListingFilters } from '../../utils/listing';

type Props = {
  facets: Facets;
  filters: ListingFilters;
  onToggle: (key: FilterKey, value: string) => void;
  hidden?: FilterKey[];
};

/** Only shows filter groups and options that have matching products. */
export function FilterPanel({ facets, filters, onToggle, hidden = [] }: Props) {
  const groups = filterKeys.filter((k) => !hidden.includes(k) && facets[k].length > 0);
  if (!groups.length) return <p className="py-4 text-sm text-ink-2">No filters available for these results.</p>;

  return (
    <div>
      {groups.map((key, i) =>
      <Accordion key={key} title={<span>{filterLabels[key]}{filters[key].length > 0 && <span className="ml-1.5 text-brand">({filters[key].length})</span>}</span>} defaultOpen={i < 3 || filters[key].length > 0}>
          <fieldset>
            <legend className="sr-only">{filterLabels[key]}</legend>
            <ul className="space-y-1">
              {facets[key].map((opt) => {
              const checked = filters[key].includes(opt.value);
              return (
                <li key={opt.value}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-md py-1.5 text-sm text-ink hover:text-brand">
                      <input type="checkbox" checked={checked} onChange={() => onToggle(key, opt.value)} className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#A2626A]" />
                      <span className="flex-1">{opt.label}</span>
                      <span className="text-xs tabular-nums text-ink-muted">{opt.count}</span>
                    </label>
                  </li>);

            })}
            </ul>
          </fieldset>
        </Accordion>
      )}
    </div>);

}