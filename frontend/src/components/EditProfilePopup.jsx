import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        name="inputName"
        type="text"
        className="popup__input popup__input_field_name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        value={name || ''}
        onChange={(event) => {
          setName(event.target.value);
        }}
        required
      />
      <span className="popup__error" id="inputName-error"></span>
      <input
        name="inputJob"
        type="text"
        className="popup__input popup__input_field_job"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        value={description || ''}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        required
      />
      <span className="popup__error" id="inputJob-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
