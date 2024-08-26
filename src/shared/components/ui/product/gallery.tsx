import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useControls } from 'react-zoom-pan-pinch';
import { FaPlusCircle } from 'react-icons/fa';
import { FaCircleMinus } from 'react-icons/fa6';
import { IoReloadCircleSharp } from 'react-icons/io5';

import { ProductDetail } from '@/modules/product/validators/product-detail.schema';
import { useIsMobile } from '@/shared/hooks/use-is-mobile';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ModalProduct from '../modal-product';

interface ProductGalleryProps {
  images: ProductDetail['defaultVariant']['images'];
  price: number;
  promoPrice: number;
}

export const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="flex gap-2 rounded-full bg-black-50 bg-opacity-50 p-1">
      <button onClick={() => zoomIn()}>
        <FaPlusCircle className="text-xl text-white-50" />
      </button>
      <button onClick={() => zoomOut()}>
        <FaCircleMinus className="text-xl text-white-50" />
      </button>
      <button onClick={() => resetTransform()}>
        <IoReloadCircleSharp className="text-[24px] text-white-50" />
      </button>
    </div>
  );
};

export const ProductGallery = ({
  images,
  price,
  promoPrice,
}: ProductGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(images?.[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentImage(images?.[0]);
  }, [images]);

  const isMobile = useIsMobile();

  const handleImageClick = (
    image: ProductDetail['defaultVariant']['images'][number],
  ) => {
    setCurrentImage(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function calculateDiscount() {
    const diferenca = price - promoPrice;
    const desconto = (diferenca / price) * 100;
    return desconto.toFixed(0);
  }

  return (
    <div className="relative flex w-full flex-col lg:h-[100vh] lg:max-h-[600px] lg:flex-row">
      {promoPrice > 0 && (
        <div className="absolute left-[10px] top-[10px] z-30 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-yellow-500 text-sm font-semibold">
          <p>{calculateDiscount()}%</p>
          <p className="-mt-1">OFF</p>
        </div>
      )}
      {!isMobile && (
        <div className="relative h-[100%] overflow-hidden lg:mr-4 lg:w-[70%]">
          <div
            className="h-[100%] cursor-pointer lg:w-[100%]"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              className="h-full w-full object-cover lg:h-[100%]"
              src={currentImage?.path}
              alt="Imagem do produto visualizado"
              width={1500}
              height={1500}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalProduct
          onClose={closeModal}
          currentImage={currentImage}
          images={images}
          handleImageClick={handleImageClick}
        />
      )}
      {isMobile && (
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="productSwiper"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <Image
                src={image?.path}
                alt="Imagem do produto"
                width={1000}
                height={1000}
                className="cursor-pointer object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {images.length > 1 && (
        <div className="mt-3 hidden w-full min-w-0 lg:mt-0 lg:flex lg:w-[30%] lg:flex-col">
          <div className="custom-scrollbar flex w-full gap-3 lg:mt-0 lg:flex-col">
            {images?.map((image, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleImageClick(image)}
                  className={`relative h-[50vh] w-[95%] min-w-[96px] cursor-pointer shadow-md 
                ${currentImage.id === image.id ? 'border-white-950' : ''} 
                  `}
                >
                  <Image
                    src={image?.path}
                    alt="Imagem do produto"
                    width={500}
                    height={500}
                    className="h-full object-cover lg:object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
