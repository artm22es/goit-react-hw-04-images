import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImageByQuery } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const buildImageObj = image => {
    return {
      id: image.id,
      src: image.webformatURL,
      largeSrc: image.largeImageURL,
    };
  };

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        const res = await getImageByQuery(query, page);

        if (page === 1) {
          if (res.hits.length === 0) {
            throw new Error(
              'Sorry, there are no images matching your search query.'
            );
          }

          setImages(res.hits.map(buildImageObj));
          setShowLoadMore(res.totalHits > 1);
          toast.success(`Hooray! We found ${res.totalHits} images!`);
          return;
        }

        setImages(prevImages => [
          ...prevImages,
          ...res.hits.map(buildImageObj),
        ]);
        setShowLoadMore(page < Number(res.totalHits) / 12);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const onSearchImage = ({ query }) => {
    setQuery(query);
    setPage(1);
    setLoading(true);
    window.scrollTo(0, 0);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onSearchImage} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {showLoadMore && !loading && <Button onLoadMore={onLoadMore} />}
    </div>
  );
};

export default App;
