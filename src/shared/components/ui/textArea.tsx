import { Label } from '@radix-ui/react-label';
import { ComponentPropsWithRef, ReactNode, forwardRef, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/helpers/shadcn-utils';

const textAreaVariants = cva(
  'border-input ring-offset-background file:bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring flex h-[140px] rounded-lg bg-white-150 px-3 py-2 text-sm file:border-0 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-white-700 bg-white-50 border',
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
  extends Omit<ComponentPropsWithRef<'textarea'>, 'size'>,
    VariantProps<typeof textAreaVariants> {
  label?: string;
  placeholder?: string;
  error?: string;
  children?: ReactNode;
  classNameContainer?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      classNameContainer = '',
      label,
      size = 'default',
      placeholder,
      error,
      children,
      variant,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const inputId = props.id ?? id;

    return (
      <div
        className={`relative mt-2 grid w-full items-center gap-1.5 ${classNameContainer}`}
      >
        {label && (
          <Label className="text-xs" htmlFor={inputId}>
            {label}
          </Label>
        )}
        <div className="relative w-full">
          <textarea
            id={inputId}
            rows={5}
            placeholder={placeholder}
            className={cn(textAreaVariants({ size, variant, className }))}
            ref={ref}
            {...props}
          />
          {children}
        </div>

        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);
