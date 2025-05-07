import "./pages/index.css";
import {
  getUserInfo,
  getInitialCards,
  updateUserProfile,
  addNewCard,
  updateAvatar
} from './components/api.js';

import { openPopup, closePopup, setPopupListeners } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation, clearValidation } from './components/validation.js';

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");

const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const cardList = document.querySelector(".places__list");

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');
const profileAvatar = document.querySelector('.profile__image');

document.querySelectorAll(".popup").forEach(popup => {
  setPopupListeners(popup);
  popup.classList.add("popup_is-animated"); 
});

function openImagePopup(link, name) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  openPopup(imagePopup);
}

function renderInitialCards(cards, userId) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, {
      onImageClick: openImagePopup,
      userId: userId
    });
    cardList.append(cardElement);
  });
}

const formProfile = editPopup.querySelector(".popup__form");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let currentUserId = null;

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  buttonElement.textContent = isLoading ? "Сохранение..." : defaultText;
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formProfile, validationConfig);
  openPopup(editPopup);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = formProfile.querySelector('.popup__button');
  renderLoading(true, submitButton);

  updateUserProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => console.error('Ошибка при обновлении профиля:', err))
    .finally(() => renderLoading(false, submitButton));
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = newCardForm.querySelector('.popup__button');
  renderLoading(true, submitButton);

  const name = cardNameInput.value.trim();
  const link = cardLinkInput.value.trim();

  if (name && link) {
    addNewCard(name, link)
      .then((newCard) => {
        const cardElement = createCard(newCard, {
          onImageClick: openImagePopup,
          userId: currentUserId
        });
        cardList.prepend(cardElement);
        newCardForm.reset();
        closePopup(newCardPopup);
      })
      .catch((err) => console.error('Ошибка при добавлении карточки:', err))
      .finally(() => renderLoading(false, submitButton));
  }
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  renderLoading(true, submitButton);

  const avatarUrl = avatarInput.value.trim();

  updateAvatar(avatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => renderLoading(false, submitButton));
}

editButton.addEventListener("click", () => {
  openEditProfilePopup();
});

addButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig); 
  openPopup(newCardPopup);
});

formProfile.addEventListener("submit", handleProfileSubmit);
newCardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

profileAvatar.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    renderInitialCards(cards, currentUserId);
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);
