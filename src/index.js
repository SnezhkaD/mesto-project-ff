import "./pages/index.css";
import { openPopup, closePopup, handleClickOverlay } from "./scripts/modal";
import {
  deleteCard,
  handleCardLike,
  recreateCard,
  openPopupImage,
} from "./scripts/card";
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
const cardUserButton = popupNewCard.querySelector(".popup__button");
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
const popupDeleteConfirm = document.querySelector(".popup_delete_confirm");
const popupConfirmButton = popupDeleteConfirm.querySelector(".popup__button");
const popupImage = document.querySelector(".popup_type_image");
let userId;

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
  buttonLoading(true, profileForm.querySelector(".popup__button"));
  updateProfile({
    name: profileForm.name.value,
    about: profileForm.description.value,
  })
    .then((updatedProfile) => {
      fullInfoProfile(updatedProfile);
      closePopup(popupTypeEdit);
      clearValidation(profileForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoading(false, profileForm.querySelector(".popup__button"));
    });
};

profileForm.addEventListener("submit", updateProfileData);

const newCardFormSubmit = async (event) => {
  event.preventDefault();
  buttonLoading(true, formNewCard.querySelector(".popup__button"));
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
      buttonLoading(false, formNewCard.querySelector(".popup__button"));
    });
};

formNewCard.addEventListener("submit", newCardFormSubmit);

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
  buttonLoading(true, formNewCard.querySelector(".popup__button"));

  updateAvatar(avatarForm.link.value)
    .then((updatedProfile) => {
      fullInfoProfile(updatedProfile);
      closePopup(avatarPopup);
      clearValidation(avatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonLoading(false, formNewCard.querySelector(".popup__button"));
    });
};
avatarForm.addEventListener("submit", updateAvatarForm);

function closePopupImage() {
  closePopup(popupImage);
}

popupImage
  .querySelector(".popup__close")
  .addEventListener("click", closePopupImage);

const handleDeleteConfirm = async (evt) => {
  deleteCardUser(popupDeleteConfirm.dataset.cardId)
    .then((result) => {
      const card = document.querySelector(
        `[data-card-id="${popupDeleteConfirm.dataset.cardId}"]`
      );
      card.remove();
      closePopup(popupDeleteConfirm);
    })
    .catch((err) => {
      console.log(err);
    });
};

popupConfirmButton.addEventListener("click", handleDeleteConfirm);

const fullInfoProfile = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

const buttonLoading = (isLoading, button) => {
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
    fullInfoProfile(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
