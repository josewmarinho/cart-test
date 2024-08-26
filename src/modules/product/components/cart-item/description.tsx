import { QuantityInput } from '@/shared/components/core/quantity-input';
import { formaterBRL } from '@/shared/helpers';

interface CartDescriptionProps {
  name: string;
  price: number;
  promoPrice?: number | null;
  size?: string;
  color?: string;
  total: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const CartDescription = ({
  name,
  price,
  promoPrice,
  size,
  color,
  total,
  quantity,
  onQuantityChange,
}: CartDescriptionProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(newQuantity);
  };

  return (
    <main className="ml-4 flex  w-full flex-col py-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3">
        <div className="line-clamp-1 max-w-fit font-normal lg:text-xl">
          {name}
        </div>
        {Boolean(promoPrice) && (
          <>
            <span className="text-sm font-bold line-through lg:text-base">
              De: {formaterBRL(price)}
            </span>
            <span className="text-sm font-bold lg:text-base">
              Por: {formaterBRL(promoPrice ?? 0)}
            </span>
          </>
        )}
        {(!promoPrice || promoPrice <= 0) && (
          <span className="text-sm font-bold lg:text-base">
            {formaterBRL(price)}
          </span>
        )}
        <div className="flex min-w-[120px] flex-row gap-2 text-xs text-[#5A5A5A] md:flex-col md:text-black-50 lg:text-base xl:flex-row">
          {!!size && <span>Tamanho {size}.</span>}
          {!!color && (
            <div className="flex flex-row items-center text-xs lg:text-base">
              <span>Cor {[color.toLowerCase()]}</span>
              <div
                className="ml-1 h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 items-center gap-10 lg:mr-10 lg:mt-0 lg:flex lg:flex-row">
        <QuantityInput
          quantity={quantity}
          changeQuantity={handleQuantityChange}
        />
      </div>
    </main>
  );
};
