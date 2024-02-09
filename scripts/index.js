// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
const cardImage = cardTemplate.content.querySelector(".card__image");
const cardTitle = cardTemplate.content.querySelector(".card__title");
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const cardElement = cardTemplate.content.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  placesList.append(cardElement);
});

// @todo: Функция удаления карточки
function deleteCard(event) {
  const button = event.target;
  const card = button.closest(".card");
  if (card) {
    card.remove();
  }
}
