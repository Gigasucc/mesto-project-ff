import { openImagePopup } from "./modal.js";

const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function createCard(card, deleter, likeHandler) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = card.link;
  cardImage.alt = `Фотография места: ${card.name}`;
  cardElement.querySelector(".card__title").textContent = card.name;

  deleteButton.addEventListener("click", () => deleter(cardElement));
  likeButton.addEventListener("click", likeHandler); 

  cardImage.addEventListener("click", () => {
    openImagePopup(card.link, card.name);
  });

  return cardElement;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

function renderInitialCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, toggleLike);
    cardContainer.append(cardElement);
  });
}

export { createCard, deleteCard, renderInitialCards, toggleLike };
