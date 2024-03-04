//Модальное окно
export function openPopup(modal) {
    modal.classList.add("popup_is-opened");
  }
  
export function closePopup(modal) {
    modal.classList.remove("popup_is-opened");
  }
  
  export function handleClickOverlay(event, modal) {
    if (event.target === modal) {
      closePopup(modal);
    }
  }

  export function handleEscKey(event, modal) {
    if (event.key === "Escape") {
      closePopup(modal);
    }
  }