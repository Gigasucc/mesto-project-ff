import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  openPopup,
  closePopup,
  setPopupListeners,
  setupEditProfileForm,
} from "./components/modal.js";
import {
  createCard,
  deleteCard,
  renderInitialCards,
  toggleLike,
} from "./components/card.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

document.querySelectorAll(".popup").forEach(setPopupListeners);

const openEditProfilePopup = setupEditProfileForm(editPopup);

editButton.addEventListener("click", openEditProfilePopup);
addButton.addEventListener("click", () => openPopup(newCardPopup));

renderInitialCards(initialCards);

const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const cardList = document.querySelector(".places__list");

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value.trim();
  const link = cardLinkInput.value.trim();

  if (name && link) {
    const newCardElement = createCard({ name, link }, deleteCard, toggleLike);
    cardList.prepend(newCardElement);
    newCardForm.reset();
    closePopup(newCardPopup);
  }
}

newCardForm.addEventListener("submit", handleAddCardSubmit);
