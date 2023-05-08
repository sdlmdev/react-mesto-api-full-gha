import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleInputChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.username,
      about: values.description,
    });
  }

  useEffect(() => {
    resetForm();
    setValues({
      username: currentUser.name,
      description: currentUser.about,
    });
  }, [isOpen, currentUser, resetForm, setValues]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile-popup"
      title="Редактировать профиль"
      container=""
      form=""
      titleClass=""
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      buttonStatus={isValid}
    >
      <input
        type="text"
        className={`popup__input popup__input_content_username ${
          !errors.username ? "" : "popup__input_type_error"
        }`}
        name="username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        id="username-input"
        value={values.username || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error username-input-error">
        {errors.username}
      </span>
      <input
        type="text"
        className={`popup__input popup__input_content_description ${
          !errors.description ? "" : "popup__input_type_error"
        }`}
        name="description"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
        id="description-input"
        value={values.description || ""}
        onChange={handleInputChange}
      />
      <span className="popup__input-error description-input-error">
        {errors.description}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
