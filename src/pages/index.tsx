import { getCategorisServices } from '@/modules/product/service/get-categorie.services';
import { getProductServices } from '@/modules/product/service/get-product.services';
import { Header } from '@/shared/components/core/header';

export interface Product {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string,
}

interface HomeProps {
  products: Product[];
  categories: String[];
}

export default function Home({
  products,
  categories,
}: HomeProps) {

  console.log('products1', products)
  console.log('categories', categories)

  return (
    <main className="flex h-full flex-col gap-0 overflow-hidden bg-white-50">
      <Header />
      <div className="z-50 md:mt-50">
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  try {
    const productPaths = await getProductServices();
    const categoriesPaths = await getCategorisServices();

    return {
      props: {
        products: productPaths ?? [],
        categories: categoriesPaths ?? [],
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        products: [],
        categories: [],
      },
    };
  }
};