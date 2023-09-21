export const Modal = ({ isOpen, onClose, cardUrl }) => {
  if (!isOpen) return null;
  const closeModal = () => {
    onClose();
  };

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={cardUrl} alt="" />
      </div>
    </div>
  );
};
