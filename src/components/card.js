import { likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector("#card-template").content;

function toggleLikeClass(likeButton, isLiked) {
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard(cardData, { onImageClick, userId }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  const { name, link, likes, _id, owner } = cardData;

  cardImage.src = link;
  cardImage.alt = `Фотография места: ${name}`;
  cardTitle.textContent = name;
  likeCountElement.textContent = likes.length;


  const isLikedByUser = likes.some(user => user._id === userId);
  toggleLikeClass(likeButton, isLikedByUser);


  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    const action = isLiked ? unlikeCard : likeCard;

    action(_id)
      .then(updatedCard => {
        toggleLikeClass(likeButton, !isLiked);
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error("Ошибка при смене лайка:", err));
  });

  if (owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  }

  cardImage.addEventListener("click", () => onImageClick(link, name));

  return cardElement;
}

export { createCard, deleteCard };

