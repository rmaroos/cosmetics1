import React from 'react';
import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';

type Props = {
  productId: string;
  productName: string;
  variant?: 'icon' | 'button';
  className?: string;
};

export function WishlistButton({ productId, productName, variant = 'icon', className }: Props) {
  const { has, toggle } = useWishlist();
  const { customer } = useAuth();
  const navigate = useNavigate();
  const saved = has(productId);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(productId);
    if (added) {
      toast.success('Saved to your wishlist', {
        description: customer ? productName : 'Saved on this device. Sign in to keep it across devices.',
        action: { label: 'View', onClick: () => navigate('/wishlist') }
      });
    } else {
      toast('Removed from your wishlist', { description: productName });
    }
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={twMerge(
          'inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-[border-color,background-color] duration-150 ease-out',
          saved ? 'border-brand bg-brand-pale text-brand' : 'border-line text-ink hover:border-ink',
          className
        )}>
        
        <HeartIcon className="h-[18px] w-[18px]" fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
        {saved ? 'Saved' : 'Save to wishlist'}
      </button>);

  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      className={twMerge(
        'flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-transform duration-150 ease-out hover:scale-105 active:scale-95',
        saved && 'text-brand',
        className
      )}>
      
      <HeartIcon className="h-[18px] w-[18px]" fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>);

}