import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  title: string;
  subTitle?: string;
  contentProps?: string;
  contentWidth?: string;
  titleProps?: string;
  subtitleProps?: string;
  children: ReactNode;
}

export default function ModalContent({
  title,
  subTitle,
  children,
  contentProps = '',
  titleProps = '',
  subtitleProps = '',
}: ModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-white-600 opacity-50" />
      <Dialog.Content
        className={`fixed left-1/2 top-1/2 z-[60] w-full ${contentProps} max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white-50 p-4 shadow md:max-w-[500px]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Dialog.Title className={`text-lg font-bold ${titleProps}`}>
              {title}
            </Dialog.Title>
            <span className={`text-sm font-normal ${subtitleProps}`}>
              {subTitle}
            </span>
          </div>
          <Dialog.Close className="self-start">
            <Cross2Icon />
          </Dialog.Close>
        </div>
        <div className="mt-4 max-h-[400px] overflow-y-auto">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
