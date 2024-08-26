import * as Dialog from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/helpers/shadcn-utils';

const Buttons = cva('rounded border', {
  variants: {
    variant: {
      default: 'bg-white-950 text-white-50',
      primary:
        'border-white-450 bg-white-50 text-white-450 w-full lg:w-[155px]',
      secondary:
        'border-blue-600 bg-blue-600 text-white-50 w-full lg:w-[155px]',
      redModal:
        'h-[39px] w-full border border-red-400 hover:bg-red-400 hover:text-white-50 text-red-400 lg:w-[155px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ModalCloseProps
  extends VariantProps<typeof Buttons>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  handleClickButton?: () => void;
}

export default function ModalClose({
  title,
  handleClickButton,
  className,
  variant,
  type,
  ...props
}: ModalCloseProps) {
  return (
    <Dialog.Close asChild className={cn(Buttons({ variant, className }))}>
      <button
        onClick={handleClickButton}
        className="px-4 py-2 text-xs"
        type={type}
        {...props}
      >
        {title}
      </button>
    </Dialog.Close>
  );
}
