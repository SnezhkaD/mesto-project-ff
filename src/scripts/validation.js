function showError(inputElement, text, validationConfig) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = text;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideError(inputElement, validationConfig) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}

function validateInput(inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideError(inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      validateInput(inputElement, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig);
    });
  });

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  toggleButtonState(inputList, submitButton, validationConfig);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButton, validationConfig) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
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
    hideError(inputElement, validationConfig);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, submitButton, validationConfig);
}

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__input-error_active",
};
