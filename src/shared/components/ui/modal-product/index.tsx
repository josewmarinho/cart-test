import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { ProductDetail } from '@/modules/product/validators';

import { Controls } from '../product';

interface ModalProductProps {
  onClose: () => void;
  currentImage: ProductDetail['defaultVariant']['images'][number] | null;
  images: ProductDetail['defaultVariant']['images'];
  handleImageClick: (
    image: ProductDetail['defaultVariant']['images'][number],
  ) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  onClose,
  images,
  currentImage,
  handleImageClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50 bg-opacity-50">
      <div className="flex h-[95%] w-[95%] flex-col rounded-xl bg-white-50 p-2 md:w-[65%]">
        <button onClick={onClose}>
          <MdClose className="float-right cursor-pointer text-3xl" />
        </button>
        <div className="flex h-[100%] w-[100%] flex-row px-9 pb-9">
          <div className="relative mr-4 h-[100%] w-[70%] overflow-hidden">
            <TransformWrapper>
              <div className="absolute left-2 top-2 z-50">
                <Controls />
              </div>
              {currentImage && (
                <TransformComponent>
                  <div className="h-[100%] cursor-grab lg:w-[100%]">
                    <Image
                      className="object-fit h-[100vh] w-full"
                      src={currentImage?.path}
                      alt="Imagem do produto visualizado"
                      width={1500}
                      height={1500}
                    />
                  </div>
                </TransformComponent>
              )}
            </TransformWrapper>
          </div>
          <div className="custom-scrollbar flex h-full w-[30%] flex-col gap-3">
            {images &&
              images?.map((image, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleImageClick(image)}
                    className={`relative h-fit w-52 cursor-pointer shadow-md  ${
                      currentImage?.id === image.id
                        ? 'border-2 border-white-950'
                        : ''
                    }`}
                  >
                    <Image
                      src={image?.path}
                      alt="Imagem do produto"
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
