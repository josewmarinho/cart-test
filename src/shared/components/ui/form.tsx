import React, { forwardRef } from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent) => void;
  id?: string | undefined;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, onSubmit, id }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} id={id}>
        {children}
      </form>
    );
  },
);
