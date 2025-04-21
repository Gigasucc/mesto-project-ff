const cardTemplate = document.querySelector("#card-template").content;


function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}


function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard({ name, link }, { onImageClick }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = `Фотография места: ${name}`;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", toggleLike);
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", () => onImageClick(link, name));

  return cardElement;
}

export { createCard, deleteCard, toggleLike };
