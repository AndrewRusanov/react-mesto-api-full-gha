import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        name="avatarLink"
        type="url"
        className="popup__input popup__input_field_link"
        placeholder="Ссылка на аватар"
        ref={ref}
        required
      />
      <span className="popup__error" id="avatarLink-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
