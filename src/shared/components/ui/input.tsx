import { Label } from '@radix-ui/react-label';
import { ComponentPropsWithRef, ReactNode, forwardRef, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/helpers/shadcn-utils';

const inputVariants = cva(
  'border-input ring-offset-background file:bg-transparent placeholder:text-gray-300 focus-visible:ring-ring flex h-10 rounded-lg bg-white-150 px-3 py-2 text-sm file:border-0 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-white-700 bg-white-50 border',
        borderBlack: 'border-black bg-white-50 border',
      },
      size: {
        default: 'w-96',
        lg: 'w-64',
        md: 'w-36',
        sm: 'w-16',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface InputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'>,
  VariantProps<typeof inputVariants> {
  label?: string;
  placeholder?: string;
  labelCSS?: string;
  error?: string;
  children?: ReactNode;
  classNameContainer?: string;
  newMargin?: boolean;
  testId?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNameContainer = '',
      type,
      label,
      size = 'default',
      placeholder,
      labelCSS = '',
      error,
      children,
      variant,
      testId,
      newMargin = false,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const inputId = props.id ?? id;
    return (
      <div
        className={`relative ${newMargin ? `` : `mt-2 grid items-center gap-1.5`
          } w-full ${classNameContainer !== '' ? `` : classNameContainer}`}
      >
        {label && (
          <Label className={`text-xs ${labelCSS}`} htmlFor={inputId}>
            {label}
          </Label>
        )}
        <div className="relative w-full">
          <input
            type={type}
            id={inputId}
            placeholder={placeholder}
            className={cn(inputVariants({ size, variant, className }))}
            ref={ref}
            {...props}
            data-testid={testId}
          />
          {children}
        </div>

        {(error || typeof error !== undefined || error != ' ') && (
          <span className="mt-1 text-xs text-red-400">{error}</span>
        )}
      </div>
    );
  },
);
