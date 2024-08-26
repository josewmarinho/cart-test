import { ChangeEvent } from 'react';

import { MinusIcon } from './icons/MinusIcon';
import { PlusIcon } from './icons/PlusIcon';

interface QuantityInputUIProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

export const QuantityInput = ({
  quantity,
  onDecrement,
  onIncrement,
  onChange,
  ref,
}: QuantityInputUIProps) => (
  <div className="flex h-[46px] w-20 min-w-fit items-center justify-around rounded-md border">
    <button
      className={`ml-2 h-full w-3 rounded-l`}
      disabled={quantity === 1}
      onClick={onDecrement}
    >
      <MinusIcon enabled={quantity > 1} />
    </button>
    <input
      className="h-full w-8 text-center text-xs focus:outline-none lg:w-10 lg:text-xs"
      value={quantity}
      onChange={onChange}
      ref={ref}
    />
    <button
      className={`mr-2 h-full w-3 rounded-l`}
      disabled={quantity >= 99}
      onClick={onIncrement}
    >
      <PlusIcon enabled={quantity < 99} />
    </button>
  </div>
);
