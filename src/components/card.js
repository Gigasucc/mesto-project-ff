const cardTemplate = document.querySelector("#card-template").content;

function createCard({ name, link }, { onDelete, onLike, onImageClick }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = `Фотография места: ${name}`;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", onLike);
  deleteButton.addEventListener("click", () => onDelete(cardElement));
  cardImage.addEventListener("click", () => onImageClick(link, name));

  return cardElement;
}

export { createCard };
