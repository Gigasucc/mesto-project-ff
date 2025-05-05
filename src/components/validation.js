function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
  inputElement.classList.remove(settings.inputErrorClass);
}

function checkInputValidity(formElement, inputElement, settings) {
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else if (
    inputElement.dataset.validateSymbols === "true" &&
    !nameRegex.test(inputElement.value)
  ) {
    showInputError(
      formElement,
      inputElement,
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.",
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function toggleButtonState(inputList, buttonElement, settings) {
  const hasInvalidInput = inputList.some(
    (inputElement) =>
      !inputElement.validity.valid ||
      (inputElement.dataset.validateSymbols === "true" &&
        !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(inputElement.value))
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}

function clearValidation(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}

export { enableValidation, clearValidation };
