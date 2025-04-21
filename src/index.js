import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { openPopup, closePopup, setPopupListeners } from "./components/modal.js";
import { createCard } from "./components/card.js";

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

document.querySelectorAll(".popup").forEach(setPopupListeners);


function openImagePopup(link, name) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  openPopup(imagePopup);
}


function renderInitialCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, {
      onImageClick: openImagePopup,
    });
    cardList.append(cardElement);
  });
}


const formProfile = editPopup.querySelector(".popup__form");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}


function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value.trim();
  const link = cardLinkInput.value.trim();

  if (name && link) {
    const newCard = createCard({ name, link }, {
      onImageClick: openImagePopup,
    });

    cardList.prepend(newCard);
    newCardForm.reset();
    closePopup(newCardPopup);
  }
}

editButton.addEventListener("click", openEditProfilePopup);
addButton.addEventListener("click", () => openPopup(newCardPopup));
formProfile.addEventListener("submit", handleProfileSubmit);
newCardForm.addEventListener("submit", handleAddCardSubmit);


renderInitialCards(initialCards);
