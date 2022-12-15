import React from "react";
import CurrentUserContext, { CardOwner } from "../contexts/CurrentUserContext";

export interface Card {
  card: CardType;
  onCardClick?: (card: any) => void;
  onCardDelete?: (card: any) => void;
  onCardLike?: (card: any, isLiked: boolean) => void;
}

export type CardType = {
  owner: CardOwner;
  likes: any[];
  link: string;
  name: string;
  readonly _id: string;
}

function Card(props: Card) {
  const user = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === user._id;

  const isLiked = props.card.likes.some((i) => i._id === user._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const cardCloseButtonClassName = `${
    isOwn ? "card__close-button" : "card__close-button_disabled"
  }`;

  function handleCardClick() {
    if (!props.onCardClick) return;
    props.onCardClick(props.card);
  }

  return (
    <div className="card">
      <button
        className={cardCloseButtonClassName}
        type="button"
        onClick={() => {
          if (!props.onCardDelete) return;
          props.onCardDelete(props.card);
        }}
      ></button>
      <img
        src={`${props.card.link}`}
        onClick={handleCardClick}
        alt={`${props.card.name}`}
        className="card__img"
      />
      <div className="card__footer">
        <h3 className="card__text">{props.card.name}</h3>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => {
              if (!props.onCardLike) return;
              props.onCardLike(props.card, isLiked);
            }}
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
