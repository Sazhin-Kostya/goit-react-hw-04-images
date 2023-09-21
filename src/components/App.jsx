import { useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import { GetCards } from './GetCards/GetCArds';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openImg, setOpenImg] = useState('');
  
  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setQuery(value);
    setPage(1);
    setCards([]);
  };
  useEffect(() => {
    const uppdatte = async () => {
      if (query !== '') {
        setLoading(true);

        try {
          const cards = await GetCards(query, page);

          if (cards.length > 0) {
            setLoadMore(true);
          }
          if (cards.length < 12) {
            setLoadMore(false);
          }

          const processedCard = cards.map(card => ({
            id: card.id,
            webformatURL: card.webformatURL,
            largeImageURL: card.largeImageURL,
          }));
          setCards(prevCards => [...prevCards, ...processedCard]);
        } catch (error) {
          console.log('OOPs...');
        } finally {
          setLoading(false);
        }
      }
    };
    uppdatte();
  }, [page, query]);

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const openModal = cardUrl => {
    document.addEventListener('keydown', handleEsc);

    setModalOpen(true);
    setOpenImg(cardUrl);
  };

  const closeModal = () => {
    document.removeEventListener('keydown', handleEsc);
    setModalOpen(false);
    setOpenImg('');
  };

  const handleEsc = e => {
    if (e.key === 'Escape' && modalOpen) {
      closeModal();
    }
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={value}
      />
      {loading ? (
        <Loader />
      ) : (
        <ImageGallery cards={cards} openModal={openModal} />
      )}

      {loadMore && <LoadMoreButton handleLoadMore={handleLoadMore} />}
      <Modal isOpen={modalOpen} onClose={closeModal} cardUrl={openImg} />
    </>
  );
};
