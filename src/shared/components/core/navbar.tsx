import { IoExitOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

import { userStore } from '@/shared/stores';


interface NavabarProps {
  variant?: 'primary' | 'secondary';
}

export interface NavProps {
  id: number;
  label: string;
  link: string;
  iconType: string;
}

const Navbar = ({ variant }: NavabarProps) => {
  const resetStates = userStore((store) => store.resetStates);
  const contentCreator = userStore((store) => store.user?.contentCreator);
  const router = useRouter();

  const navBarItems: NavProps[] = [
    {
      id: 1,
      label: 'Minha conta',
      link: '/minha-conta',
      iconType: 'account',
    },
    {
      id: 2,
      label: 'Meus pedidos',
      link: '/minha-conta/pedidos',
      iconType: 'order',
    },
    {
      id: 3,
      label: 'Meus endereços',
      link: '/minha-conta/enderecos',
      iconType: 'address',
    },
    {
      id: 4,
      label: 'Meus cartões',
      link: '/minha-conta/meus-cartoes',
      iconType: 'payment',
    },
  ];

  function handleSignOut() {
    router.push('/');
    localStorage.removeItem('cart');
    resetStates();
  }

  return (
    <div className="w-full">

      <button
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-md p-2 text-xs font-normal transition duration-300 ease-in-out hover:bg-blue-500"
      >
        <IoExitOutline size={27} />
        Sair
      </button>

      {contentCreator && (
        <>
          <hr className="my-3 text-white-200" />
          <Link
            href={'/admin'}
            className="inline-flex h-8 w-full flex-row items-center justify-center rounded-2xl bg-white-950 p-4 text-xs text-white-50"
          >
            <IoIosArrowForward size={16} />
            Ir para admin
          </Link>
        </>
      )}
    </div>
  );
};

export { Navbar };
