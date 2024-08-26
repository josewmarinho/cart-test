import { ChangeEvent, forwardRef } from 'react';

import { QuantityInput as QuantityInputUI } from '../ui/quantity-inputUI';

interface QuantityInputProps {
  quantity: number;
  changeQuantity: (newQuantity: number) => void;
}

const QuantityInput = forwardRef<HTMLInputElement, QuantityInputProps>(
  ({ quantity, changeQuantity }, ref) => {
    const decrement = () => {
      if (quantity > 1) {
        changeQuantity(quantity - 1);
      }
    };

    const increment = () => {
      if (quantity < 99) {
        changeQuantity(quantity + 1);
      }
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) return changeQuantity(1);
      let newQuantity = parseInt(e.target.value, 10);
      if (!isNaN(newQuantity)) {
        newQuantity = Math.min(Math.max(newQuantity, 1), 99);
        changeQuantity(newQuantity);
      }
    };

    return (
      <QuantityInputUI
        quantity={quantity}
        onDecrement={decrement}
        onIncrement={increment}
        onChange={handleQuantityChange}
        ref={ref}
      />
    );
  },
);

export { QuantityInput };
