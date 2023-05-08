function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup-image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup-image__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup-image__figure">
          <img
            className="popup-image__picture"
            alt={card.name}
            src={card.link}
          />
          <figcaption className="popup-image__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
