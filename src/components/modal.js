function openPopup(popup) {
  popup.classList.add("popup_is-animated");

  requestAnimationFrame(() => {
    popup.classList.add("popup_is-opened");
  });

  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);

  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 600);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function setPopupListeners(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup__image")
    ) {
      closePopup(popup);
    }
  });
}

function openImagePopup(link, name) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(imagePopup);
}

function setupEditProfileForm(popup) {
  const formElement = popup.querySelector(".popup__form");
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popup);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popup);
  }

  formElement.addEventListener("submit", handleFormSubmit);

  return openEditPopup;
}

export {
  openPopup,
  closePopup,
  setPopupListeners,
  openImagePopup,
  setupEditProfileForm,
};
