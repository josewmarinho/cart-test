import { ItemToAddCart } from '../stores/cart-store';

export const getProductCardId = (item: ItemToAddCart) => {
  if (item.color && item.size) {
    return item.id + item.color + item.size;
  }

  if (item.color) {
    return item.id + item.color;
  }

  if (item.size) {
    return item.id + item.size;
  }

  return item.id;
};
