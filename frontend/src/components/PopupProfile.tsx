import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export interface PopupProfile {
  onUpdateUser: (arg0: { name: string; about: string }) => void;
  isOpen: boolean;
  onClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

function PopupProfile(props: PopupProfile) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name);
    }
    if (currentUser.about) {
      setDescription(currentUser.about);
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сменить имя и работу"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__input"
        id="name"
        value={name || ""}
        minLength={2}
        maxLength={40}
        required
        onChange={handleChangeName}
      />
      <span className="popup__form-error name-error"></span>
      <input
        type="text"
        name="about"
        className="popup__input"
        id="text"
        value={description || ""}
        minLength={2}
        maxLength={200}
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__form-error text-error"></span>
    </PopupWithForm>
  );
}

export default PopupProfile;
