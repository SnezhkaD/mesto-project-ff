import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, handleCardLike } from "./scripts/card";
import {
  openPopup,
  closePopup,
  handleClickOverlay,
  handleEscKey,
} from "./scripts/modal";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const typeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeEditButton = typeEdit.querySelector(".popup__close");
const closeNewCard = popupNewCard.querySelector(".popup__close");
const popupform = typeEdit.querySelector(".popup__form");
const nameInput = popupform.querySelector(".popup__input_type_name");
const descriptionInput = popupform.querySelector(
  ".popup__input_type_description"
);
const formNewCard = popupNewCard.querySelector(".popup__form");
const placeNameInput = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = formNewCard.querySelector(".popup__input_type_url");
const template = document.querySelector("#card-template").content;
const modals = document.querySelectorAll(".popup");

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  placesList.append(cardElement);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    handleClickOverlay(event, modal);
  });
});

editButton.addEventListener("click", function () {
  openPopup(typeEdit);
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description"
  ).textContent;
});

addButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

closeEditButton.addEventListener("click", function () {
  closePopup(typeEdit);
});

closeNewCard.addEventListener("click", function () {
  closePopup(popupNewCard);
});

document.addEventListener("keydown", function (event) {
  handleEscKey(event, typeEdit);
  handleEscKey(event, popupNewCard);
  handleEscKey(event, popupImage);
});

popupform.addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;
  closePopup(typeEdit);
});

formNewCard.addEventListener("submit", function (event) {
  event.preventDefault();
  showCard(placeNameInput.value, linkInput.value);
  placeNameInput.value = "";
  linkInput.value = "";
  closePopup(popupNewCard);
});

function addCard(name, link, cardLike, openPopupImage) {
  const cardElement = template.cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function showCard(name, link) {
  placesList.prepend(addCard(name, link));
}

placesList.addEventListener("click", handleCardLike);

//Вывести изображение
const popupImage = document.querySelector(".popup_type_image");

function openPopupImage(card) {
  const image = card.querySelector(".card__image");
  const caption = card.querySelector(".card__title").textContent;

  const popupImageContent = popupImage.querySelector(
    ".popup__content_content_image"
  );
  const popupImageTitle = popupImageContent.querySelector(".popup__caption");
  const popupImageElement = popupImageContent.querySelector(".popup__image");

  popupImageElement.src = image.src;
  popupImageElement.alt = caption;
  popupImageTitle.textContent = caption;

  openPopup(popupImage);
}

function closePopupImage() {
  closePopup(popupImage);
}

placesList.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__image")) {
    openPopupImage(event.target.closest(".card"));
  }
});

popupImage
  .querySelector(".popup__close")
  .addEventListener("click", closePopupImage);
