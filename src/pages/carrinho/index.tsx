import Link from 'next/link';

import { Header } from '@/shared/components/core';
import { formaterBRL } from '@/shared/helpers';

import { Button } from '@/shared/components/ui';
import { useCartStore } from '@/shared/stores';
import { CartItems } from '@/modules/product/components/cart-items';

const Cart = () => {
  const { cart, dataValueTotal } = useCartStore((state) => ({
    cart: state.cart,
    dataValueTotal: state.dataValueTotal,
  }));

  return (
    <main className="flex min-h-screen flex-col bg-white-50">
      <div className="min-h-[45rem]">
        <div className="lg:pb-28">
          <Header />
        </div>
        <div className="mx-10 flex flex-col justify-between bg-white-50 md:mt-10 lg:mx-0 lg:flex-row">
          <CartItems dataItem={cart} />

          {cart.length > 0 && (
            <div className="mb-16 flex w-full flex-col lg:mb-36 lg:ml-16 lg:mr-32 lg:w-2/6">
              <span className="mt-4 border-b border-b-white-350 py-2 text-base font-bold lg:mt-0 lg:border-0">
                Revise seu pedido
              </span>
              <div className="my-4 flex flex-col border-t-white-350 py-3 lg:max-w-[280px] lg:border-t">
                <div className="my-4 flex items-center justify-between">
                  <span className="text-base">Subtotal</span>
                  <span className="text-base">
                    {formaterBRL(dataValueTotal)}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center">
                  <Link className="w-full" href="/finalizar-pedido">
                    <Button
                      testId="checkout-button"
                      size="lg"
                      className="mt-3"
                      variant="fill"
                    >
                      Finalizar Pedido
                    </Button>
                  </Link>
                  <Link className="w-full" href="/">
                    <Button
                      testId="continue-shopping-button"
                      size="lg"
                      className="mt-3"
                      variant="fillOutline"
                    >
                      Continuar comprando
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
