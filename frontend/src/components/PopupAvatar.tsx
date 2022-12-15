import React from "react";
import PopupWithForm from "./PopupWithForm";

export interface PopupAvatar {
  onUpdateAvatar: (avatar: any) => void;
  isOpen: boolean;
  onClose: (event: React.MouseEvent) => void;
}

function PopupAvatar(props: PopupAvatar) {
  const urlRef = React.createRef<HTMLInputElement>();
  const node = urlRef.current

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!node) return;
    props.onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }

  React.useEffect(() => {
    if (!node) return;
    urlRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="avatar"
      title="Сменитъ фотокарточку"
      buttonText="Сохранить"
      onSubmit={onSubmit}
    >
      <input
        ref={urlRef}
        type="url"
        name="avatar"
        className="popup__input"
        id="avatar-link"
        placeholder="Ссылка на novuyu avu"
        required
      />
    </PopupWithForm>
  );
}

export default PopupAvatar;
