const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupWindow = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__description');
const inputFieldName = document.querySelector('.popup__input-field_type_name');
const inputFieldDescription = document.querySelector('.popup__input-field_type_description');

function togglePopupWindow(popup) {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

closePopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

inputFieldName.value = userName.textContent;
inputFieldDescription.value = userDescription.textContent;

popupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userName.textContent = inputFieldName.value;
  userDescription.textContent = inputFieldDescription.value;
  togglePopupWindow(popupWindow);
});
