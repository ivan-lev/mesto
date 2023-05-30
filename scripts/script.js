// =============== Изменение информации юзера ===============

const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupWindow = document.querySelector('#user-popup-window');
const popupForm = document.querySelector('.popup__form');

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__description');
const inputFieldName = document.querySelector('.popup__input-field_type_name');
const inputFieldDescription = document.querySelector('.popup__input-field_type_description');

// Открыть или скрыть всплывающее окно - общая функция
function togglePopupWindow(popup) {
  popup.classList.toggle('popup_opened');
}

// Открыть окно редактирования данных юзера и вывести уже вбитые данные
openPopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
  inputFieldName.value = userName.textContent;
  inputFieldDescription.value = userDescription.textContent;
});

// Закрыть окно редактирования юзера
closePopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

// Сохранить на странице новые данные юзера
popupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userName.textContent = inputFieldName.value;
  userDescription.textContent = inputFieldDescription.value;
  togglePopupWindow(popupWindow);
});

// =============== Код для создания и взаимодействия с фотокарточками ===============

const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;
const cardTemplateElement = cardTemplateContent.querySelector('.elements__card');
const cardsSection = document.querySelector('.elements');

// Создать фотокарточку
function createCard(card) {
  const newCard = cardTemplateElement.cloneNode(true);
  /** @type {HTMLImageElement} */
  const newCardImage = newCard.querySelector('.elements__photo');
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  const newCardName = newCard.querySelector('.elements__photo-name');
  newCardName.textContent = card.name;

  // Удалить фотокарточку
  const deleteButton = newCard.querySelector('.elements__del-button');
  deleteButton.addEventListener('click', function () {
    cardsSection.removeChild(newCard);
    //deleteButton.closest('.elements__card').remove(); - тоже рабочий метод
  });

  // Поставить лайк фотокарточке
  const likeButton = newCard.querySelector('.elements__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-button_active');
  });

  // Код, открывающий поп-ап картинки
  newCardImage.addEventListener('click', function () {
    showPhotoWindow(card);
  });

  return newCard;
}

// =============== Код для взаимодействия с поп-апом изображения ===============
// Передаём функции параметры, она встраивает их в код шаблона

const photoWindow = document.querySelector('.popup_photo-window');
const displayedPhoto = photoWindow.querySelector('.popup__photo');
const displayedCaption = photoWindow.querySelector('.popup__figcaption');
const closePhotoWindowButton = document.querySelector('#close-photo-window-button');

// Отобразить поп-ап с изображением
function showPhotoWindow(object) {
  displayedPhoto.src = object.link;
  displayedPhoto.alt = object.name;
  displayedCaption.textContent = object.name;
  togglePopupWindow(photoWindow);
}

// Слушатель, закрывающий поп-ап с изображением
closePhotoWindowButton.addEventListener('click', function () {
  togglePopupWindow(photoWindow);
});

// =============== Взаимодействие с окном добавления фотокарточки ===============

const openPhotoAddButton = document.querySelector('#add-photo-button');
const closePhotoAddButton = document.querySelector('#close-photo-add-button');
const popupPhotoWindow = document.querySelector('#photo-add-popup-window');
const popupPhotoForm = document.querySelector('#popup__photo-form');

/* Открыть окно добавления фото */
openPhotoAddButton.addEventListener('click', function () {
  togglePopupWindow(popupPhotoWindow);
});

/* Закрыть окно добавления фото */
closePhotoAddButton.addEventListener('click', function () {
  togglePopupWindow(popupPhotoWindow);
});

const inputFieldPhotoName = document.querySelector('.popup__input-field_type_photo-name');
const inputFieldPhotoLink = document.querySelector('.popup__input-field_type_photo-url');

/* Сохранить на странице новую карточку */
popupPhotoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = { name: '', link: '' };
  newCardData.name = inputFieldPhotoName.value;
  newCardData.link = inputFieldPhotoLink.value;
  const newItem = createCard(newCardData);
  cardsSection.prepend(newItem);
  togglePopupWindow(popupPhotoWindow);
  inputFieldPhotoName.value = '';
  inputFieldPhotoLink.value = '';
});

// =============== Заполнить страницу дефолтными ккарточками ===============

/* Создать фотокарточки из файла */
initialCards.forEach(function (item) {
  const newItem = createCard(item);
  cardsSection.prepend(newItem);
});
