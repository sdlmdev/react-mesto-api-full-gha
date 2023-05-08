import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup-card"
      title="Новое место"
      container=""
      titleClass=""
      form="popup-card__form"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      buttonStatus={isValid}
    >
      <input
        type="text"
        className={`popup__input popup__input_content_name ${
          !errors.name ? "" : "popup__input_type_error"
        }`}
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        id="name-input"
        onChange={handleInputChange}
        value={values.name || ""}
      />
      <span className="popup__input-error name-input-error">{errors.name}</span>
      <input
        type="url"
        className={`popup__input popup__input_content_link ${
          !errors.link ? "" : "popup__input_type_error"
        }`}
        name="link"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        onChange={handleInputChange}
        value={values.link || ""}
      />
      <span className="popup__input-error link-input-error">{errors.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
