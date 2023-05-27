const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupWindow = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__description');
const inputFieldName = document.querySelector('.popup__input-field_type_name');
const inputFieldDescription = document.querySelector('.popup__input-field_type_description');

/* Открыть или скрыть всплывающее окно */
function togglePopupWindow(popup) {
  popup.classList.toggle('popup_opened');
}

/* Открыть окно редактирования юзера */
openPopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

/* Закрыть окно редактирования юзера */
closePopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

/* Отобразить в попа-апе данные юзера */
inputFieldName.value = userName.textContent;
inputFieldDescription.value = userDescription.textContent;

/* Сохранить на странице новые данные юзера */
popupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userName.textContent = inputFieldName.value;
  userDescription.textContent = inputFieldDescription.value;
  togglePopupWindow(popupWindow);
});
