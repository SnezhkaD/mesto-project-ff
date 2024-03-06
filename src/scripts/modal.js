//Модальное окно
export function openPopup(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}

export function handleClickOverlay(event, modal) {
  if (event.target === modal) {
    closePopup(modal);
  }
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
