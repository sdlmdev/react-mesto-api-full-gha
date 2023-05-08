import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `cards__like ${
    (isLiked && "cards__like_active") || ""
  }`;

  return (
    <article className="cards__element">
      <img
        className="cards__image"
        alt={card.name}
        src={card.link}
        onClick={() => onCardClick(card)}
      />
      <div className="cards__text">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-box">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => {
              onCardLike(card);
            }}
          />
          <p className="cards__like-counter">
            {card.likes.length > 0 ? card.likes.length : null}
          </p>
        </div>
        {isOwn && (
          <button
            className="cards__delete"
            type="button"
            onClick={() => {
              onDeleteClick(card);
            }}
          />
        )}
      </div>
    </article>
  );
}

export default Card;
