import { unlikeCard, likeCard } from "./api";

export function createCard(
  card,
  userId,
  deleteCard,
  handleCardLike,
  openPopupImage
) {
  const cardTemplate = document.querySelector("#card-template");
  const cardImage = cardTemplate.content.querySelector(".card__image");
  const cardTitle = cardTemplate.content.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const cardElement = cardTemplate.content.cloneNode(true);
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardLikeCount.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  cardLikeButton.addEventListener("click", (evt) => {
    handleCardLike(evt, card._id);
  });

  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) => {
      deleteCard(evt, card._id);
    });
  } else {
    deleteButton.remove();
  }

  const showCard = cardElement.querySelector(".card__image");
  showCard.addEventListener("click", openPopupImage);

  return cardElement;
}

export const handleCardLike = async (evt, cardId) => {
  const correctLikes = evt.target.parentNode.querySelector(".card__like-count");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardId)
      .then((updateCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        correctLikes.textContent = updateCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((updateCard) => {
        evt.target.classList.add("card__like-button_is-active");
        correctLikes.textContent = updateCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
