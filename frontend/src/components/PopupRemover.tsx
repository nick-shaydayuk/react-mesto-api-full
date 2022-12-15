import React from "react";
import PopupWithForm from "./PopupWithForm";

export interface PopupRemover {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

function PopupRemover(props: PopupRemover) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="remover"
      title="You sure?"
      buttonText="Удаляй уже"
    />
  );
}

export default PopupRemover;