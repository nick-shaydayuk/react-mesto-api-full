import React from "react";
import PopupWithForm from "./PopupWithForm";

export interface PopupAddPost {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
  onSubmit: ( arg0: {name: string, link: string} ) => void;
}

function PopupAddPost(props: PopupAddPost) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return
    setName(e.target.value);
  }

  function handleChangeUrl(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    props.onSubmit({
      name: name,
      link: url,
    });
  }

  React.useEffect(() => {
    setName("");
    setUrl("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add-post"
      title="Добавить картинку"
      buttonText="Создать"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__input"
        id="place-name"
        value={name}
        placeholder="Название"
        minLength={1}
        maxLength={30}
        required
        onChange={handleChangeName}
      />
      <span className="popup__form-error place-name-error"></span>
      <input
        type="url"
        name="link"
        className="popup__input"
        id="place-link"
        value={url}
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeUrl}
      />
      <span className="popup__form-error place-link-error"></span>
    </PopupWithForm>
  );
}

export default PopupAddPost;
