import React from "react";
import { Link } from "react-router-dom";

export interface MobileMenu {
  email: string;
  handleLogout: () => void;
  isMobileMenuOpen: boolean;
}

function MobileMenu(props: MobileMenu) {
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__links-container">
        <p className="mobile-menu__email">{props.email}</p>
        <Link
          to="/sign-in"
          className="header__link"
          onClick={() => {
            props.handleLogout();
          }}
        >
          Выйти
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
