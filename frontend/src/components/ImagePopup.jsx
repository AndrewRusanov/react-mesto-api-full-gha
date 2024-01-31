import closeButton from '../images/close-icon.svg';

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_overlay ${card && 'popup_opened'}`} id="img-popup">
      <div className="popup__figure">
        <button type="button" className="popup__close-button" id="close-img" onClick={onClose}>
          <img className="popup__close-icon" src={closeButton} alt="Кнопка закрытия окна" />
        </button>
        <div className="popup__photo">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <p className="popup__caption">{card?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
