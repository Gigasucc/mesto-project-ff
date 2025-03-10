// @todo: Темплейт карточки
const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы



// @todo: Функция создания карточки

function createCard() {
  initialCards.forEach(function (card) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__title").textContent = card.name;

    cardContainer.append(cardElement);

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement);
    });
  });
}

// @todo: Функция удаления карточки

function deleteCard(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу

createCard();
