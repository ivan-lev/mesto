import { initialCards } from './constants.js';
import { Card } from './Card.js';

// все кнопки закрытия попапов
const closeButtonsList = Array.from(document.querySelectorAll('.popup__close-button'));

// ======= Переменные, относящиеся к данным юзера ======= //
const currentUserName = document.querySelector('.profile__username');
const currentUserDescription = document.querySelector('.profile__description');
const newUserName = document.querySelector('.popup__input_type_name');
const newUserDescription = document.querySelector('.popup__input_type_description');

// ======= Переменные, относящиеся к созданию фотокарточки на странице ======= //
export const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.cards__card');

// ======= Переменные, относящиеся к поп-апу редактирования данных юзера ======= //
const popupEditProfile = document.querySelector('#popup-edit-profile');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');

// ======= Переменные, относящиеся к поп-апу просмотра фотографии ======= //
const popupPhotoWindow = document.querySelector('.popup_photo-window');
const photoToDisplay = popupPhotoWindow.querySelector('.popup__photo');
const captionToDisplay = popupPhotoWindow.querySelector('.popup__figcaption');

// ======= Переменные, относящиеся к поп-апу добавления места ======= //
const popupAddPlace = document.querySelector('#place-add-popup-window');
const formAddPlace = document.querySelector('#popup__photo-form');
const buttonOpenPopupAddPlace = document.querySelector('#open-popup-add-photo-button');
const newPlaceTitle = document.querySelector('.popup__input_type_photo-title');
const newPlaceLink = document.querySelector('.popup__input_type_photo-link');
const popupAddPlaceButton = document.querySelector('.popup__add-photo-button');

// ..................... ФУНКЦИИ ..................... //

// Открыть поп-ап и добавить слушатели его закрытия по Esc и на оверлее
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mouseup', closePopupByOverlay);
};

// Закрыть попап и снять слушатели его закрытия по Esc и на оверлее
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mouseup', closePopupByOverlay);
};

// Функция закрытия окна по нажатию Esc
const closePopupByEsc = event => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Функция закрытия окна по клику на оверлее
const closePopupByOverlay = event => {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.target === openedPopup) {
    closePopup(openedPopup);
  }
};

// Открыть поп-ап с изображением
export const showPhotoWindow = object => {
  photoToDisplay.src = object.link;
  photoToDisplay.alt = object.name;
  captionToDisplay.textContent = object.name;
  openPopup(popupPhotoWindow);
};

// ..................... СЛУШАТЕЛИ ..................... //

// вешаем на все кнопки закрытия слушатель закрытия попапа
closeButtonsList.forEach(closeButton =>
  closeButton.addEventListener('click', function () {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  })
);

// Открыть окно редактирования данных юзера и отобразить актуальные данные
// Сбрасываем состояния элементов формы, так как данные юзера валидны
buttonOpenEditProfile.addEventListener('click', function () {
  const inputList = Array.from(popupEditProfile.querySelectorAll('.popup__input'));
  const errorList = Array.from(popupEditProfile.querySelectorAll('.popup__error'));
  const profileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');
  inputList.forEach(inputElement => inputElement.classList.remove('popup__input_type_error'));
  errorList.forEach(errorElement => errorElement.classList.remove('popup__error_visible'));
  profileSubmitButton.classList.remove('popup__submit-button_disabled');

  openPopup(popupEditProfile);
  newUserName.value = currentUserName.textContent;
  newUserDescription.value = currentUserDescription.textContent;
});

// Сохранить на странице новые данные юзера
editProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  currentUserName.textContent = newUserName.value;
  currentUserDescription.textContent = newUserDescription.value;
  closePopup(popupEditProfile);
});

// Форма добавления нового места
formAddPlace.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = { imageTitle: newPlaceTitle.value, imageLink: newPlaceLink.value };
  const card = new Card(newCardData, cardTemplate);
  const cardElement = card.generateCard();
  cardsSection.prepend(cardElement);
  closePopup(popupAddPlace);
  formAddPlace.reset();
});

// Слушатель открытия добавления нового места
// Если поля формы невалидны, то деактивируем кнопку и открываем поп-ап
buttonOpenPopupAddPlace.addEventListener('click', function () {
  const inputList = Array.from(formAddPlace.querySelectorAll('.popup__input'));
  const validityOfForm = inputList.every(function (input) {
    return input.validity.valid;
  });
  if (!validityOfForm) {
    popupAddPlaceButton.classList.add('popup__submit-button_disabled');
    popupAddPlaceButton.setAttribute('disabled', 'true');
  }
  openPopup(popupAddPlace);
});

// генерируем дефолтные карточки
initialCards.forEach(function (item) {
  const card = new Card(item, cardTemplate);
  const cardElement = card.generateCard();
  cardsSection.prepend(cardElement);
});
