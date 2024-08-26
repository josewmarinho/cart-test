export interface CardFooterProps {
  title: string;
  price: string;
  promoPrice?: string | null;
  rating?: number;
}

const CardFooter = ({ title, price, promoPrice }: CardFooterProps) => {
  return (
    <div className="justify-items z-10 -mt-10 h-28 w-full overflow-hidden rounded-t-lg bg-white-100 px-2 shadow-inner lg:-mt-40">
      <h3 className="ml-2 mt-4 truncate text-xl">{title}</h3>
      <div className="ml-2 flex items-center justify-between">
        {promoPrice && (
          <>
            <div className="text-base text-white-550">
              <span>De: </span>
              <span className="line-through">{price}</span>
            </div>
            <div className="text-base text-white-550">
              <span>Por: </span>
              <span className="text-[22px] text-black-50">{promoPrice}</span>
            </div>
          </>
        )}
        {!promoPrice && (
          <span className="text-[22px] text-black-50">{price}</span>
        )}
      </div>
    </div>
  );
};

export { CardFooter };
