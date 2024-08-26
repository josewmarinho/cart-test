import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export default function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}
