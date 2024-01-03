import React, { useState } from 'react';
import { Image } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/ModalImage/ModalImage';

const ImageGalleryItem = ({ src, largeSrc, tags }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Image
        onClick={() => {
          setModalIsOpen(prevState => !prevState);
        }}
        src={src}
        alt={tags}
      />
      <ModalImage
        src={largeSrc}
        tags={tags}
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default ImageGalleryItem;
