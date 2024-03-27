function showError(inputElement, text) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = text;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideError(inputElement) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}

function validateInput(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage);
  } else {
    hideError(inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      validateInput(inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  toggleButtonState(inputList, submitButton);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideError(inputElement);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, submitButton);
}

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__input-error_active",
};
