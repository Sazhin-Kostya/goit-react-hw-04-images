export default function ImageGalleryItem({ src, alt, largeImg, openModal }) {
  const openModalClick = () => {
    openModal(largeImg);
  };

  return (
    <>
      <li className="ImageGalleryItem" onClick={openModalClick}>
        <img src={src} alt={alt} className="ImageGalleryItem-image" />
      </li>
    </>
  );
}
