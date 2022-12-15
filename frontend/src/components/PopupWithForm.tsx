import React from "react";

export interface PopupWithForm {
  name: string;
  title: string;
  buttonText: string;
  isOpen: boolean;
  onClose: (event: React.MouseEvent) => void;
  onSubmit?: (event: React.FormEvent) => void;
  children?: React.ReactNode
}

function PopupWithForm(props: PopupWithForm) {
  return (
    <section className={`popup popup-${props.name} ${props.isOpen && "popup_active"}`}>
      <div className="popup__container">
        <button
          className={`popup__close-button popup-${props.name}__close-button`}
          type="button"
          onClick={props.onClose}
        ></button>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h3 className="popup__heading">{props.title}</h3>
          ${props.children}
          <button
            className={`popup__submit-button popup-${props.name}__submit-button`}
            type="submit"
          >{props.buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;



