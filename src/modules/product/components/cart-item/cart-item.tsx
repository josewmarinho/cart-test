import { GrFormClose } from 'react-icons/gr';
import { ReactNode } from 'react';

import { CartImage } from './image';

interface CartItemProps {
  imageUrl: string;
  children: ReactNode;
  remove: () => void;
}

export const CartItem = ({ imageUrl, children, remove }: CartItemProps) => {
  return (
    <div className="my-2 flex justify-around border-0 lg:items-center lg:border-b lg:border-b-white-350">
      <CartImage imageUrl={imageUrl} />
      {children}
      <span onClick={remove} className="cursor-pointer py-6 lg:py-0">
        <GrFormClose size={18} />
      </span>
    </div>
  );
};
