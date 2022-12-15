import React from "react";

export interface ImagePopup {
  isOpen: boolean;
  onClose: (event: React.MouseEvent) => void;
  card: {
    name?: string;
    link?: string;
  };
}

function ImagePopup(props: ImagePopup) {
  return (
    <section className={`popup popup-card ${props.isOpen && "popup_active"}`}>
      <div className="popup-card__container">
        <button
          className="popup__close-button popup-card__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={`${props.card.link}`}
          alt={`${props.card.name}`}
          className="popup-card__img"
        />
        <p className="popup-card__text">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
