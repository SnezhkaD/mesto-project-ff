import { openPopup } from "./modal";
import { unlikeCard, likeCard } from "./api";
const popupDeleteConfirm = document.querySelector(".popup_delete_confirm");

export function createCard(card, userId) {
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

export const deleteCard = (evt, cardId) => {
  openPopup(popupDeleteConfirm);
  popupDeleteConfirm.dataset.cardId = cardId;
};

export const handleCardLike = async (evt, cardId) => {
  let correctLikes = evt.target.parentNode.querySelector(".card__like-count");
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

export const recreateCard = (
  item,
  userId,
  containerCard,
  deleteCard,
  handleCardLike,
  openPopupImage
) => {
  const cardElement = createCard(
    item,
    userId,
    deleteCard,
    handleCardLike,
    openPopupImage
  );
  if (containerCard.lastElementChild === null) {
    containerCard.append(cardElement);
  } else {
    containerCard.prepend(cardElement);
  }
};

const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(
  ".popup__content_content_image"
);
const popupImageTitle = popupImageContent.querySelector(".popup__caption");
const popupImageElement = popupImageContent.querySelector(".popup__image");

export function openPopupImage(event) {
  if (event.target.classList.contains("card__image")) {
    const card = event.target.closest(".card");
    const image = card.querySelector(".card__image");
    const caption = card.querySelector(".card__title").textContent;
    popupImageElement.src = image.src;
    popupImageElement.alt = caption;
    popupImageTitle.textContent = caption;
    openPopup(popupImage);
  }
}
