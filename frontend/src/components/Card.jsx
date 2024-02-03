import { useContext } from "react";
import trashButton from "../images/Trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__delete"
          type="button"
          onClick={() => {
            handleDeleteClick(card._id);
          }}
        >
          <img
            className="element__delete-icon"
            src={trashButton}
            alt="Удалить карточку"
          />
        </button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__mask"
        onClick={() => {
          handleClick();
        }}
      />
      <div className="element__description">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => {
              handleLikeClick();
            }}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
