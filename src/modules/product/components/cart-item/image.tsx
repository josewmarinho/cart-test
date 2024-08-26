import Image from 'next/image';

interface CartImageProps {
  imageUrl?: string;
}

const placeholder =
  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export const CartImage = ({ imageUrl }: CartImageProps) => {
  return (
    <main className="my-6 flex h-36 w-40 min-w-[130px] overflow-hidden rounded-lg bg-white-100 shadow-lg lg:items-center">
      <div className="relative h-full w-full items-center">
        <Image
          className="justify-items self-center object-cover"
          src={imageUrl ?? placeholder}
          fill
          alt="Imagem do produto"
        />
      </div>
    </main>
  );
};
