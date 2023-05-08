import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isAuthStatus, message }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__info-container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__info-icon"
          src={isAuthStatus ? success : fail}
          alt="Иконка результата регистрации"
        />
        <p className="popup__info-text">{message.text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
