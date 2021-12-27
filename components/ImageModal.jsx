import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

// const photos = [
//   {
//     src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
//     width: 4,
//     height: 3,
//   },
//   {
//     src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
//     width: 3,
//     height: 3,
//   },
//   {
//     src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
//     width: 3,
//     height: 3,
//   },
//   {
//     src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
//     width: 3,
//     height: 3,
//   },
//   {
//     src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
//     width: 3,
//     height: 3,
//   },
// ];

export default function ImageModal({ photos = null }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div className='w-full flex flex-col'>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
