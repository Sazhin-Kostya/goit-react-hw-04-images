import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import { GetCards } from './GetCards/GetCArds';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    cards: [],
    page: 1,
    query: '',
    loading: false,
    error: false,
    value: '',
    loadMore: false,
    modalOpen: false,
    openImg: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ query: this.state.value, page: 1, cards: [] });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      try {
        const cards = await GetCards(this.state.query, this.state.page);

        if (cards.length > 0) {
          this.setState({ loadMore: true });
        }
        if (cards.length < 12) {
          this.setState({ loadMore: false });
        }

        const processedCard = cards.map(card => ({
          id: card.id,
          webformatURL: card.webformatURL,
          largeImageURL: card.largeImageURL,
        }));
        this.setState(prevState => ({
          cards: [...prevState.cards, ...processedCard],
        }));
      } catch (error) {
        console.log('OOPs...');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = async () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.setState({ page: nextPage });
  };

  openModal = cardUrl => {
    document.addEventListener('keydown', this.handleEsc);
    this.setState({
      modalOpen: true,
      openImg: cardUrl,
    });
  };

  closeModal = () => {
    document.removeEventListener('keydown', this.handleEsc);

    this.setState({
      modalOpen: false,
      openImg: '',
    });
  };

  handleEsc = e => {
    if (e.key === 'Escape' && this.state.modalOpen) {
      this.closeModal();
    }
  };

  render() {
    return (
      <>
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.value}
        />
        {this.state.loading ? (
          <Loader />
        ) : (
          <ImageGallery cards={this.state.cards} openModal={this.openModal} />
        )}

        {this.state.loadMore && (
          <LoadMoreButton handleLoadMore={this.handleLoadMore} />
        )}
        <Modal
          isOpen={this.state.modalOpen}
          onClose={this.closeModal}
          cardUrl={this.state.openImg}
        />
      </>
    );
  }
}
