
import { useEffect } from 'react';
import { getProductServices } from '@/modules/product/service/get-product.services';

export interface Product {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
}

interface HomeProps {
  products: Product[];
}

export default function Home({
  products,
}: HomeProps) {

  useEffect(() => {
    const handleProducts = async () => {
      const result = await getProductServices();
      console.log('Fetched products:', result);
    };

    const delayTimeout = setTimeout(() => {
      handleProducts();
    }, 2000);

    return () => clearTimeout(delayTimeout);
  }, []);


  return (
    <main className="flex h-screen w-full flex-col bg-white-950">
      
    </main>
  );
}

export const getServerSideProps = async () => {
  try {
  
    return {
      props: {
        products: [],
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        products: [],
      },
    };
  }
};