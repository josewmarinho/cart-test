import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useOnScroll } from '@/shared/hooks/use-on-scroll';
import { useIsMobile } from '@/shared/hooks/use-is-mobile';

import { Input, HeaderUI, NavProps, Button } from '../ui';

interface HeaderProps {
  hiddenSearch?: boolean;
}

export const navBarItems: NavProps[] = [
  {
    id: 1,
    label: 'Home',
    link: '/',
  },
  {
    id: 2,
    label: 'Produtos',
    link: '/produtos',
  },
  {
    id: 3,
    label: 'Carrinho',
    link: '/carrinho',
  },
];

const Header = ({ hiddenSearch = false }: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { register, handleSubmit } = useForm<{ q: string; q_desk: string }>();
  const router = useRouter();
  const { isDarkMode } = useOnScroll();

  const handleSearch = ({ q }: { q: string }) => {
    router.replace(`/produtos?q=${q}`);
  };

  const isMobile = useIsMobile();

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black-50 opacity-50"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <HeaderUI
        navItems={navBarItems}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        brandImage={
          isDarkMode && router.pathname === '/' && !isMobile
            ? `https://storage.googleapis.com/prod-bucket-test-flow/FlowGames_Logotipo_Preto_e_Amarelo.png`
            : 'https://storage.googleapis.com/prod-bucket-test-flow/FlowGames_Logotipo_Branco_e_Amarelo.png'
        }
        title=""
      >
        {!hiddenSearch ? (
          <form
            className="z-40 hidden w-full lg:flex"
            onSubmit={handleSubmit(handleSearch)}
          >
            <Input
              className={`h-12 w-full rounded-3xl rounded-l-3xl border-none transition-all duration-500 ${
                isDarkMode && router.pathname === '/'
                  ? `bg-white-50`
                  : `bg-[#F9F9F93A] text-white-50`
              } pl-4 pr-10 lg:pr-20`}
              type="text"
              placeholder="O que você está procurando?"
              {...register('q')}
              testId="search-input"
            >
              <div
                className={`${
                  isDarkMode && router.pathname === '/'
                    ? `text-[#FFE200]`
                    : `text-gray-400`
                } absolute inset-y-0 right-0 flex items-center pr-3`}
              >
                <Button
                  testId="search-button"
                  variant="default"
                  className={`${
                    isDarkMode && router.pathname === '/'
                      ? `text-white-950`
                      : `text-[#FFE200]`
                  }`}
                  type="submit"
                >
                  <AiOutlineSearch size={20} />
                </Button>
              </div>
            </Input>
          </form>
        ) : (
          <div className="h-12" />
        )}
      </HeaderUI>
      <div
        className={`${
          router.pathname === '/' ? `pt-[69px]` : `pt-[62px]`
        } w-full lg:hidden`}
      >
        {isMobile && (
          <form className="z-40 w-full" onSubmit={handleSubmit(handleSearch)}>
            <Input
              newMargin
              className={`mt-0 h-[47px] w-full rounded-none border-none pl-6  transition-all duration-500 lg:pr-20`}
              type="text"
              placeholder="O que você está procurando?"
              {...register('q')}
              testId="search-input"
            >
              <div
                className={`absolute inset-y-0 right-0 flex items-center pr-8`}
              >
                <Button
                  testId="search-button"
                  variant="default"
                  className={`text-white-950`}
                  type="submit"
                >
                  <AiOutlineSearch size={20} />
                </Button>
              </div>
            </Input>
          </form>
        )}
      </div>
    </>
  );
};

export { Header };
