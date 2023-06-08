import { useState, useEffect } from 'react';
import { fetchImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { animateScroll } from 'react-scroll';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  // const [id, setId] = useState(null);
  const per_page = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);

    try {
      const { images, totalImages } = await fetchImages(searchQuery, page);
      if (images.length === 0) {
        return alert('Sorry, nothing found');
      }
      console.log(images, totalImages);
      setImages(prevImages => [...prevImages, ...images]);
      setLoadMore(page < Math.ceil(totalImages / per_page));
      }
    catch (error) {
      setError({ error });
    } 
    finally {
      setIsLoading(false);
    }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onloadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = largeImageURL => {
    console.log(largeImageURL);
      setShowModal(true);
      setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
      setShowModal(false);
  };

    return (
      <>
        <Searchbar onSubmit={formSubmit} />
        
        {isLoading && <Loader />}

        {images.length >= 1 && <ImageGallery images={images} openModal={openModal} />}

        {error && <p> Oops, something went wrong :( </p>}

        {loadMore && <Button onloadMore={onloadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={closeModal} />
        )}
        
      </>
    );
}
