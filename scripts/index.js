// @todo: Темплейт карточки
const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы



// @todo: Функция создания карточки

function createCard(card, deleter) {
  
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = `Фотография места: ${card.name}`;
    cardElement.querySelector(".card__title").textContent = card.name;


    deleteButton.addEventListener("click", function () {
      deleter(cardElement);
  });

    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard);
  cardContainer.append(cardElement);
});
