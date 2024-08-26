import Link from 'next/link';

import { Product } from '@/pages';
import { formaterBRL } from '@/shared/helpers';

import { CardHeader } from './card-header';
import { CardFooter } from './card-footer';
import { CardImage } from './card-image';

const ProductCard = ({
  name,
  price,
  promoPrice,
  releaseBadge,
  slug,
  id,
  defaultVariant,
}: Product) => {
  return (
    <Link
      href={`${slug}/p/${id}`}
      className="duration-y transform transition duration-500 hover:scale-105"
    >
      <div className="flex h-full w-full overflow-hidden rounded-lg bg-white-100 shadow-lg ">
        <div className="justify-items relative flex h-full w-full flex-col justify-between">
          <CardHeader releaseBadge={releaseBadge} />
          <CardImage
            image={
              defaultVariant?.images?.[0]?.path ??
              `https://storage.googleapis.com/dev-bucket-test-flow/creators/9a642dc9-4687-4f0e-a0c0-f34dc6fc2c05/products/camiseta-raglan-cinza-gg-izi/10_4_7_775_fundo20cinza.webp`
            }
          />
          <CardFooter
            title={name ?? ''}
            promoPrice={promoPrice !== 0 ? formaterBRL(promoPrice) : null}
            price={formaterBRL(price) ?? ''}
          />
        </div>
      </div>
    </Link>
  );
};

export { ProductCard };
