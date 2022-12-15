import React from "react";
import pencil from "../images/popup-avatar-edit-icon.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

export interface Main {
  handleEditAvatarClick: () => void;
  handleEditProfileClick: () => void;
  handleAddPostClick: () => void;
  cards: any[];
  onCardClick: any;
  handleCardLike: any;
  handleCardDelete: any;
}

function Main(props: Main) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={props.handleEditAvatarClick}
        >
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay">
            <img src={pencil} alt="pencil" />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.handleEditProfileClick}
            ></button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.handleAddPostClick}
        >
          +
        </button>
      </section>
      <section className="cards" id="cards">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
