import { Link } from "react-router-dom";

function PageWithForm({
  name,
  onSubmit,
  buttonText,
  title,
  isRegister,
  errors,
  buttonStatus,
  values,
  handleInputChange,
}) {
  return (
    <div className="page-form">
      <h2 className="page-form__title">{title}</h2>
      <form name={name} onSubmit={onSubmit} noValidate>
        <fieldset className="page-form__set">
          <input
            id="email"
            type="text"
            placeholder="Email"
            className={`page-form__input ${
              !errors.email ? "" : "popup__input_type_error"
            }`}
            name="email"
            minLength="5"
            maxLength="40"
            required
            value={values.email || ""}
            onChange={handleInputChange}
          />

          <span className="popup__input-error email-input-error">
            {errors.email}
          </span>
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className={`page-form__input ${
              !errors.password ? "" : "popup__input_type_error"
            }`}
            name="password"
            required
            value={values.password || ""}
            onChange={handleInputChange}
          />

          <span className="popup__input-error popup__input-error_password password-input-error">
            {errors.password}
          </span>
          <button
            className={`page-form__button ${
              buttonStatus ? "" : "page-form__button_disabled"
            }`}
            type="submit"
            disabled={!buttonStatus}
          >
            {buttonText}
          </button>
          {isRegister && (
            <p className="page-form__redirect">
              Уже зарегистрированы?
              <Link
                to="/sign-in"
                className="page-form__redirect page-form__redirect_active"
              >
                {" Войти"}
              </Link>
            </p>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default PageWithForm;
