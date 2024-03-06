export function createCard(item, deleteCard, handleCardLike, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template");
  const cardImage = cardTemplate.content.querySelector(".card__image");
  const cardTitle = cardTemplate.content.querySelector(".card__title");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const cardElement = cardTemplate.content.cloneNode(true);

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleCardLike);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const showCard = cardElement.querySelector(".card__image");
  showCard.addEventListener("click", openPopupImage);

  return cardElement;
}

export function deleteCard(event) {
  const button = event.target;
  const card = button.closest(".card");
  if (card) {
    card.remove();
  }
}

export function handleCardLike(event) {
  if (event.target.classList.contains("card__like-button")) {
    const currentCard = event.target.closest(".card");
    event.target.classList.toggle("card__like-button_is-active");
  }
}
