import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';

import { Button } from '@/shared/components/ui';
import { userStore } from '@/shared/stores';

import { CartItemProps, useCartStore } from '@/shared/stores';
import { CartItem, CartDescription } from '../components/cart-item';

interface CartItemsProps {
  dataItem: CartItemProps[];
}

export const CartItems = ({ dataItem }: CartItemsProps) => {
  const user = userStore((store) => store.user);

  const { removeItem, updateItemTotal, cart } = useCartStore((store) => ({
    removeItem: store.removeItem,
    updateItemTotal: store.updateItemTotal,
    addItem: store.addItem,
    cart: store.cart,
  }));
  const validationDataCart = dataItem.length > 0;

  return (
    <div
      className={`flex flex-col justify-start ${
        validationDataCart ? 'lg:ml-32 lg:mr-16 lg:w-4/6' : 'lg:mx-32 lg:w-full'
      }`}
    >
      {validationDataCart ? (
        <>
          <span
            className={`mt-4 text-[22px] lg:mt-2 ${
              cart.length > 0 ? 'font-bold' : 'font-medium'
            }`}
          >
            Meu Carrinho
          </span>
          <div className="flex flex-col border-0 lg:border-t lg:border-t-white-350">
            {dataItem.map((item, index) => (
              <CartItem
                key={index}
                imageUrl={item.imageUrl}
                remove={() => removeItem(item.productCartId)}
              >
                <CartDescription
                  name={item.name}
                  price={item.price}
                  promoPrice={item.promoPrice}
                  size={item.size}
                  color={item.color}
                  total={item.total}
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) =>
                    updateItemTotal(item.productCartId, newQuantity)
                  }
                />
              </CartItem>
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-screen w-full flex-col items-center gap-7">
          <div className="mt-10 items-center justify-center self-center rounded-full bg-white-100 p-4">
            <FiShoppingCart size={38} />
          </div>
          <span className="self-center font-bold lg:text-4xl">
            Seu carrinho está vazio.
          </span>
          <span className="text-center align-middle text-white-650 lg:text-xl">
            Quando você adicionar produtos ao seu carrinho, eles aparecerão por
            aqui.
          </span>
          <Button
            testId="explore-products-button"
            variant="fill"
            size="lg"
            className="h-[52px]"
            asChild
          >
            <Link href="/">Explore Produtos</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
