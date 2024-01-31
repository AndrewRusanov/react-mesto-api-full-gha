import { useContext } from 'react';
import editButton from '../images/EditButton.png';
import addButton from '../images/profile__add-button.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) => {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__flex">
          <div
            className="profile__avatar-container"
            onClick={onEditAvatar}
          >
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button profile__button_type_edit"
              onClick={onEditProfile}
            >
              <img className="profile__button-edit" src={editButton} alt="Конпка редактирования" />
            </button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button profile__button_type_add"
          onClick={onAddPlace}
        >
          <img
            className="profile__button-add"
            src={addButton}
            alt="Кнопка добавления изображения"
          />
        </button>
      </section>
      <section className="elements" id="elements">
        {cards.map(card => {
          return (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
