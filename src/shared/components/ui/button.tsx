import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/shared/helpers/shadcn-utils';

const Buttons = cva(
  'inline-flex items-center justify-center transition-colors rounded-[5px] text-xs gap-[10px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-white-50',
        fill: 'bg-white-950 text-white-50 hover:bg-white-900 disabled:bg-white-300',
        fillBlue:
          'bg-blue-600 text-white-50 hover:bg-blue-650 disabled:bg-blue-600',
        fillRounded:
          'bg-white-950 text-white-50 hover:bg-white-900 disabled:bg-white-400 rounded-[95px]',
        fillOutline:
          'bg-transparent border-white-950 text-white-950 hover:bg-white-150 hover:text-white-950 border',
        fillOutlineRed:
          'bg-transparent border-red-750 text-red-750 hover:bg-red-50 border',
        fillOrange:
          'bg-orange-500 text-black-50 hover:bg-orange-550 disabled:bg-orange-300',
        fillYellow:
          'bg-yellow-500 text-black-50 hover:bg-yellow-300 disabled:bg-yellow-100',
      },
      size: {
        default: 'w-full h-[47px]',
        lg: 'w-full lg:w-[280px] p-4 h-[47px]',
        sm: 'w-full lg:w-[155px] p-3 h-[39px]',
        banner: 'w-[213px] max-w-[213px] h-[39px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'ref'>,
    VariantProps<typeof Buttons> {
  asChild?: boolean;
  testId?: string;
  isLoading?: boolean;
  href?: string;
  target?: string;
  loadingText?: string;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  children,
  loadingText,
  testId,
  ...props
}: ButtonProps) => {
  if (asChild) {
    return (
      <Slot className={cn(Buttons({ variant, size, className }))} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      data-testid={testId}
      className={cn(Buttons({ variant, size, className }))}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText && <span className=" ml-2">{loadingText}</span>}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export { Button, Buttons };
