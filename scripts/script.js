const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupWindow = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');

const authorName = document.querySelector('.profile__username');
const authorAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.popup__author-name');
const aboutInput = document.querySelector('.popup__author-about');

function togglePopupWindow(popup) {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

closePopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

nameInput.value = authorName.textContent;
aboutInput.value = authorAbout.textContent;

popupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  authorName.textContent = nameInput.value;
  authorAbout.textContent = aboutInput.value;
  togglePopupWindow(popupWindow);
});
