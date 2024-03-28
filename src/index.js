import "./pages/index.css";
import { openPopup, closePopup, handleClickOverlay } from "./scripts/modal";
import { createCard, handleCardLike } from "./scripts/card";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation";
import {
  getInitialInfo,
  deleteCardUser,
  updateProfile,
  updateAvatar,
  addNewCard,
} from "./scripts/api.js";

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
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const closeAvatar = avatarPopup.querySelector(".popup__close");
const profileAvatar = document.querySelector(".profile__image");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(
  ".popup__content_content_image"
);
const popupImageTitle = popupImageContent.querySelector(".popup__caption");
const popupImageElement = popupImageContent.querySelector(".popup__image");
let userId; //только через let получается

// @todo: Вывести карточки на страницу
const renderInitialCards = (initialCards, userId) => {
  initialCards.forEach((card) => {
    recreateCard(
      card,
      userId,
      placesList,
      deleteCard,
      handleCardLike,
      openPopupImage
    );
  });
};

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    handleClickOverlay(event, modal);
  });
});

const recreateCard = (
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

profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

profileAddButton.addEventListener("click", function () {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openPopup(popupNewCard);
});

closeEditButton.addEventListener("click", function () {
  closePopup(popupTypeEdit);
});

closeNewCard.addEventListener("click", function () {
  closePopup(popupNewCard);
  formNewCard.reset();
});

const updateProfileData = async (event) => {
  event.preventDefault();
  changeButtonLoading(true, profileForm.querySelector(".popup__button"));
  updateProfile({
    name: profileForm.name.value,
    about: profileForm.description.value,
  })
    .then((updatedProfile) => {
      getFullInfoProfile(updatedProfile);
      closePopup(popupTypeEdit);
      clearValidation(profileForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonLoading(false, profileForm.querySelector(".popup__button"));
    });
};

profileForm.addEventListener("submit", updateProfileData);

const handleNewCardForm = async (event) => {
  event.preventDefault();
  changeButtonLoading(true, formNewCard.querySelector(".popup__button"));
  const name = placeNameInput.value;
  const link = linkInput.value;
  const alt = placeNameInput.value;

  addNewCard({ name, link, alt })
    .then((newCard) => {
      recreateCard(
        newCard,
        userId,
        placesList,
        deleteCard,
        handleCardLike,
        openPopupImage
      );
      formNewCard.reset();
      closePopup(popupNewCard);
      clearValidation(formNewCard, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonLoading(false, formNewCard.querySelector(".popup__button"));
    });
};

formNewCard.addEventListener("submit", handleNewCardForm);

profileAvatarButton.addEventListener("click", function () {
  avatarForm.reset();
  openPopup(avatarPopup);
});

closeAvatar.addEventListener("click", function () {
  avatarForm.reset();
  closePopup(avatarPopup);
});

const updateAvatarForm = async (evt) => {
  evt.preventDefault();
  changeButtonLoading(true, avatarForm.querySelector(".popup__button"));

  updateAvatar(avatarForm.link.value)
    .then((updatedProfile) => {
      getFullInfoProfile(updatedProfile);
      closePopup(avatarPopup);
      clearValidation(avatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonLoading(false, avatarForm.querySelector(".popup__button"));
    });
};
avatarForm.addEventListener("submit", updateAvatarForm);

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

function closePopupImage() {
  closePopup(popupImage);
}

popupImage
  .querySelector(".popup__close")
  .addEventListener("click", closePopupImage);

export const deleteCard = (evt, cardId) => {
  deleteCardUser(cardId);
  const button = evt.target;
  const card = button.closest(".card");
  if (card) {
    card.remove();
  }
};

const getFullInfoProfile = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

const changeButtonLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    getFullInfoProfile(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
