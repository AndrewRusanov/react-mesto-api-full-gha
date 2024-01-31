import closeButton from "../images/close-icon.svg";

const InfoTooltip = ({ isOpen, onClose, loggedIn }) => {
  return (
    <div className={`popup ${isOpen && `popup_opened`}`} id="tip-popup">
      <div className="popup__container">
        <button
          type="reset"
          className="popup__close-button"
          id="close-tip"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={closeButton}
            alt="Кнопка закрытия окна"
          />
        </button>
        <div className={`popup__tooltip ${ loggedIn ? `popup__tooltip_success` : `popup__tooltip_failure`}`} ></div>
        <p className="popup__subtitle-tip" >{ loggedIn ? `Вы успешно зарегистрировались!`:`Что-то пошло не так! Попробуйте ещё раз.`}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
