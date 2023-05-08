import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="popup-avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      titleClass=""
      form="popup-avatar__form"
      container="popup-avatar__container"
      onSubmit={handleSubmit}
      buttonStatus={isValid}
    >
      <input
        type="url"
        className={`popup__input popup__input_content_link ${
          !errors.avatar ? "" : "popup__input_type_error"
        }`}
        name="avatar"
        value={values.avatar || ""}
        placeholder="Ссылка на изображение"
        required
        id="avatar-input"
        onChange={handleInputChange}
      />
      <span className="popup__input-error avatar-input-error popup-avatar__error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
