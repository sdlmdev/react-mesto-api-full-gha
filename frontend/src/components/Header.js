import logo from "../images/logo.svg";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header({ email, logout }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {isPopupOpen && location.pathname === "/" && (
        <div className="header__popup">
          <p className="header__popup__email">{email}</p>
          <Link to="/sign-in" className="header__popup__link" onClick={logout}>
            Выйти
          </Link>
        </div>
      )}
      <header className="header">
        <img src={logo} className="header__logo" alt="Логотип проекта Mesto" />
        {/* {location.pathname === "/" && <p className="header__email">{email}</p>} */}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <Link
                  to="/sign-in"
                  className="header__link header__link_logout"
                  onClick={logout}
                >
                  Выйти
                </Link>
                <div
                  className={`header__burger ${
                    isPopupOpen ? "header__burger_open" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  <span className="header__burger_line"></span>
                  <span className="header__burger_line"></span>
                  <span className="header__burger_line"></span>
                </div>
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;
