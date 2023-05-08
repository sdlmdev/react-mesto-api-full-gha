import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ isOpen, onClose, onSubmit, card, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      titleClass="popup-delete-container__title"
      container="popup-delete-container"
      name="popup-delete"
      form=""
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      buttonStatus={true}
    />
  );
}

export default PopupWithConfirmation;
