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
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
}

export { openPopup, closePopup, setPopupListeners };
