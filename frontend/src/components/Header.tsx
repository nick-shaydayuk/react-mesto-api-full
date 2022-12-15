import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import burger from "../images/burger.svg";
import crossing from "../images/crossing.svg";

export interface Header {
  isLoggedIn: boolean;
  email: string;
  handleLogout: () => void;
  isLogin: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (arg0: boolean) => void;
}

function Header(props: Header) {
  return (
    <header className="header">
      <img src={logo} alt="mesto" className="header__logo" />
      {props.isLoggedIn && (
        <div className="header__links-container">
          <p className="header__email">{props.email}</p>
          <div className="header__link-container">
            {" "}
            {props.isLoggedIn ? (
              <Link
                to="/sign-in"
                className="header__link"
                onClick={() => {
                  props.handleLogout();
                }}
              >
                Выйти
              </Link>
            ) : props.isLogin ? (
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            ) : (
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            )}
          </div>
        </div>
      )}

      {props.isLoggedIn ? (
        <div className="header__mobile-menu">
          {props.isMobileMenuOpen ? (
            <div
              onClick={() => {
                props.setIsMobileMenuOpen(false);
              }}
            >
              <img src={crossing} alt="burger" className="header__burger" />
            </div>
          ) : (
            <div
              onClick={() => {
                props.setIsMobileMenuOpen(true);
              }}
            >
              <img src={burger} alt="burger" className="header__burger" />
            </div>
          )}
        </div>
      ) : props.isLogin ? (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) : (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
