import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, handleCardLike } from "./scripts/card";
import { openPopup, closePopup, handleClickOverlay } from "./scripts/modal";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeEditButton = popupTypeEdit.querySelector(".popup__close");
const closeNewCard = popupNewCard.querySelector(".popup__close");
const profileForm = popupTypeEdit.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);
const formNewCard = popupNewCard.querySelector(".popup__form");
const placeNameInput = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = formNewCard.querySelector(".popup__input_type_url");
const modals = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardElement = createCard(
    item,
    deleteCard,
    handleCardLike,
    openPopupImage
  );
  placesList.append(cardElement);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    handleClickOverlay(event, modal);
  });
});

profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

closeEditButton.addEventListener("click", function () {
  closePopup(popupTypeEdit);
});

closeNewCard.addEventListener("click", function () {
  closePopup(popupNewCard);
});

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
});

formNewCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const newItem = {
    name: placeNameInput.value,
    link: linkInput.value,
    alt: placeNameInput.value,
  };
  const newCard = createCard(
    newItem,
    deleteCard,
    handleCardLike,
    openPopupImage
  );

  placesList.prepend(newCard);
  placeNameInput.value = "";
  linkInput.value = "";
  closePopup(popupNewCard);
});
//Вывести изображение
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(
  ".popup__content_content_image"
);
const popupImageTitle = popupImageContent.querySelector(".popup__caption");
const popupImageElement = popupImageContent.querySelector(".popup__image");

function openPopupImage(event) {
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

function closePopupImage() {
  closePopup(popupImage);
}

popupImage
  .querySelector(".popup__close")
  .addEventListener("click", closePopupImage);
