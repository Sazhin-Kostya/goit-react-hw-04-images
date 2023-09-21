import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ cards, openModal }) {
  return (
    <ul className="ImageGallery">
      {cards.map(card => (
        <ImageGalleryItem
          key={card.id}
          src={card.webformatURL}
          alt={card.tags}
          largeImg={card.largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}
