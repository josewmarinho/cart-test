import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useStore } from '@/shared/hooks/use-store';
import { getProductCardId } from '../helpers/get-product-card-id';

export type ItemToAddCart = Omit<CartItemProps, 'productCartId' | 'total'>;

interface CartActions {
  addItem: (newItem: ItemToAddCart) => void;
  updateDataValueTotal: () => void;
  updateItemTotal: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  updateCartItemQuantity: () => void;
  setShipping: (shipping: number | null) => void;
  resetStates: () => void;
}

export interface CartItemProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  promoPrice: number;
  size?: string;
  color?: string;
  sku: string;
  quantity: number;
  total: number;
  productCartId: string;
  contentCreatorId: string;
}

interface CartStates {
  cart: CartItemProps[];
  dataValueTotal: number;
  shipping: number | null;
  totalItemsQuantity: number;
}

interface CartStore extends CartStates, CartActions {}

const initialCarState: CartStates = {
  cart: [],
  dataValueTotal: 0,
  shipping: null,
  totalItemsQuantity: 0,
};

export const cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialCarState,
      addItem: (newItem: ItemToAddCart) => {
        const { cart, updateDataValueTotal, updateCartItemQuantity } = get();

        const productCartId = getProductCardId(newItem);

        const existingItem = cart.find(
          (item) => item.productCartId === productCartId,
        );

        if (existingItem) {
          const updatedCart = cart.map((item) => {
            let finalValue = item.price;
            if (item.promoPrice && item.promoPrice > 0) {
              finalValue = item.promoPrice;
            }
            if (item.productCartId === productCartId) {
              const quantity = item.quantity + newItem.quantity;
              return {
                ...item,
                quantity,
                total: quantity * finalValue,
              };
            }

            return item;
          });

          set({
            cart: updatedCart,
          });
          updateCartItemQuantity();
          updateDataValueTotal();

          return;
        }

        let finalValue = newItem.price;
        if (newItem.promoPrice && newItem.promoPrice > 0) {
          finalValue = newItem.promoPrice;
        }
        const total = finalValue * newItem.quantity;

        set({
          cart: [
            ...cart,
            {
              ...newItem,
              total,
              productCartId,
            },
          ],
        });
        updateCartItemQuantity();
        updateDataValueTotal();
      },
      updateDataValueTotal: () => {
        const { cart } = get();

        const dataValueTotal = cart.reduce((acc, item) => acc + item.total, 0);

        set({ dataValueTotal });
      },
      removeItem: (id: string) => {
        const { cart, updateDataValueTotal, updateCartItemQuantity } = get();

        const cartItemsWithoutRemovedItem = cart.filter(
          (item) => item.productCartId !== id,
        );

        set({ cart: cartItemsWithoutRemovedItem });
        updateCartItemQuantity();
        updateDataValueTotal();
      },
      resetStates: () => {
        set(initialCarState);
      },
      updateItemTotal: (id: string, newQuantity: number) => {
        const { cart, updateDataValueTotal, updateCartItemQuantity } = get();

        const newCart = cart.map((item) => {
          if (item.productCartId === id) {
            let finalValue = item.price;
            if (item.promoPrice && item.promoPrice > 0) {
              finalValue = item.promoPrice;
            }
            const total = finalValue * newQuantity;

            return {
              ...item,
              quantity: newQuantity,
              total,
            };
          }

          return item;
        });

        set({ cart: newCart });
        updateCartItemQuantity();
        updateDataValueTotal();
      },
      updateCartItemQuantity: () => {
        const { cart } = get();
        const itemQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
        set({ totalItemsQuantity: itemQuantity });
      },
      setShipping: (shipping) => set({ shipping }),
    }),
    { name: 'cart' },
  ),
);

export const useCartStore = <T>(callback: (state: CartStore) => T) =>
  useStore(cartStore, callback, initialCarState);
