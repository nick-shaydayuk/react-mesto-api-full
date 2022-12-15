import React from "react";
import regSuc from "../images/regSuc.svg";
import regBan from "../images/regBan.svg";
import crossing from "../images/crossing.svg";

export interface InfoTooltip {
  isOpen: boolean;
  setIsInfoTooltipOpen: (arg0: boolean) => void;
  isSucceed: boolean;
  onClose: (event: React.MouseEvent) => void;
}

function InfoTooltip(props: InfoTooltip) {
  return (
    <div
      className={`register-popup ${props.isOpen && "register-popup_active"}`}
    >
      <div className="register-popup__container">
        <img
          src={crossing}
          alt="crossing"
          className="register-popup__close-button"
          onClick={() => {
            props.setIsInfoTooltipOpen(false);
          }}
        />
        {props.isSucceed ? (
          <div>
            <img src={regSuc} />
            <p className="register-popup__text">Чекайте на повістку!</p>
          </div>
        ) : (
          <div>
            <img src={regBan} />
            <p className="register-popup__text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
