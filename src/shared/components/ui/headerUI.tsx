import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { MdMenu } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { useCartStore, userStore } from '@/shared/stores';
import { useOnScroll } from '@/shared/hooks/use-on-scroll';

import { Button } from './button';
import { obtainAcronym } from '@/shared/helpers';

export interface HeaderUIProps {
  brandImage: string;
  title: string;
  advertisement?: string;
  icon?: ReactNode;
  navItems: NavProps[];
  isMenuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  children?: ReactNode;
}

export interface NavProps {
  id: number;
  label: string;
  link: string;
}

export const HeaderUI = ({
  brandImage,
  title,
  advertisement,
  icon,
  navItems,
  isMenuOpen,
  setMenuOpen,
  children,
}: HeaderUIProps) => {
  const user = userStore((store) => store.user);
  const totalItemsQuantity = useCartStore((store) => store.totalItemsQuantity);

  const { isDarkMode } = useOnScroll();
  const router = useRouter();

  return (
    <>
      {advertisement && (
        <p>HeaderBaner</p>
      )}
      <div
        className={`fixed left-0 right-0 z-50 flex items-center justify-between py-2 transition-all duration-500 ${
          isDarkMode && router.pathname === '/'
            ? `bg-black-50 lg:bg-white-950 lg:bg-opacity-30`
            : `bg-black-50`
        } max-h-[69px] bg-opacity-80 md:px-10 lg:max-h-fit lg:py-4 lg:backdrop-blur-[15px] xl:px-32`}
      >
        <div className="ml-4 flex items-center lg:ml-0">
          <div className="flex lg:hidden">
            <Button
              testId="menu-toggle-button"
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="h-8 w-8 items-center justify-center rounded-sm text-xl text-white-50"
            >
              {isMenuOpen ? <IoMdClose /> : <MdMenu />}
            </Button>
          </div>
          <Link href="/" className="flex items-center">
           

            <span className="ml-3 text-xs font-semibold text-white-50 sm:text-base md:text-xl lg:ml-3 lg:text-3xl lg:font-normal lg:text-white-950">
              {title}
            </span>
          </Link>
        </div>

        <div className="mx-2 flex">
          <div className="mx-2 flex w-full justify-between lg:m-auto lg:min-w-[659.89px]">
            {children}
          </div>
        </div>

        <div className="flex min-h-[50px] items-center">
          {!user && (
            <div className="hidden md:block">
              <Link href="/" className="flex items-center p-2">
                <FaUser size={27} className="text-white-50" />
                <div className="ml-2 flex flex-col text-xs">
                  <span className="font-medium text-white-50">
                    Entre ou cadastre-se
                  </span>
                  <span className="text-[11px] font-normal text-white-50">
                    para ver seus pedidos
                  </span>
                </div>
              </Link>
            </div>
          )}
          <div className="z-50 mr-4 flex w-auto items-center gap-3 lg:ml-8 lg:mr-0">
            {user && (
              <div className="hidden flex-row items-center gap-3 lg:flex">
                <span
                  className={`font-semibold ${
                    isDarkMode && router.pathname === '/'
                      ? `text-white-50`
                      : `text-white-200`
                  }`}
                >
                  Olá, {user?.name}
                </span>
                <p>UserMenu</p>
                {/* <UserMenu name={user?.name} /> */}
              </div>
            )}

            <div className="flex flex-col items-center">
              {totalItemsQuantity > 0 && (
                <div className="z-50 flex h-5 w-5 items-center justify-center rounded-full bg-white-50 lg:bg-white-950">
                  <span className="text-center text-xs text-white-950  lg:text-white-100">
                    {totalItemsQuantity}
                  </span>
                </div>
              )}

              <Button
                testId='"cart-button"'
                asChild
                variant="default"
                className="mx-4"
              >
                <Link href="/carrinho">
                  <PiShoppingCartSimple
                    className={`${
                      totalItemsQuantity ? 'mb-5' : 'mb-0'
                    } text-xl text-white-50 lg:text-2xl`}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 lg:mx-0">
        <div className="relative bg-blue-600 lg:hidden">
          {isMenuOpen && (
            <div className="fixed inset-y-0 left-0 z-50 w-full bg-white-50 p-5 text-white-950 sm:w-3/4">
              <div className="flex h-full flex-col items-start justify-start">
                {user && (
                  <Link
                    href="/"
                    className="mt-4 flex items-center"
                  >
                    <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white-250 text-white-550">
                      <span>{obtainAcronym(user?.name)}</span>
                    </div>
                    <div className="ml-2 flex flex-col">
                      <span className="text-xs font-semibold text-white-950">
                        Olá, {user?.name}
                      </span>
                      <span className="text-[10px] text-white-300">
                        Clique para ir em conta
                      </span>
                    </div>
                  </Link>
                )}
                {!user && (
                  <Link href="/" className="mt-4 flex items-center">
                    <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white-250 text-white-550">
                      <FaUser size={22} />
                    </div>
                    <div className="ml-2 flex flex-col text-sm">
                      <span className="font-medium">Entre ou cadastre-se</span>
                      <span className="text-xs font-normal text-white-300">
                        para ver seus pedidos
                      </span>
                    </div>
                  </Link>
                )}
                {navItems.map(({ id, label, link }) => (
                  <Button
                    testId={`menu-button-${id}`}
                    asChild
                    variant="default"
                    className="ml-1 mt-4 w-auto items-center justify-between p-2 text-base text-white-950"
                    key={id}
                  >
                    <Link href={link}>{label}</Link>
                  </Button>
                ))}
                <Button
                  testId="close-menu-button"
                  className="absolute right-4 top-2 text-xl text-white-950"
                  onClick={() => setMenuOpen(false)}
                >
                  <IoMdClose />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
