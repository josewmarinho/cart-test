import Image from 'next/image';

export interface CardImageProps {
  image: string;
}

const CardImage = ({ image }: CardImageProps) => {
  return (
    <div className="relative h-full w-full bg-white-100">
      <Image
        className="justify-items h-full w-full self-center object-cover"
        src={image}
        width={1920}
        height={1080}
        alt="Imagem do produto"
      />
    </div>
  );
};

export { CardImage };
