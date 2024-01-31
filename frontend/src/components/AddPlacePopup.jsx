import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [place, setPlace] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlace("");
    setPlaceLink("");
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({
      name: place,
      link: placeLink,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="addCard"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        name="inputPlace"
        type="text"
        className="popup__input popup__input_field_place"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={place}
        onChange={(event) => {
          setPlace(event.target.value);
        }}
        required
      />
      <span className="popup__error" id="inputPlace-error"></span>
      <input
        name="inputLink"
        type="url"
        className="popup__input popup__input_field_link"
        placeholder="Ссылка на картинку"
        value={placeLink}
        onChange={(event) => {
          setPlaceLink(event.target.value);
        }}
        required
      />
      <span className="popup__error" id="inputLink-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
