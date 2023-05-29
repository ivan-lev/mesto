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

// Открыть окно редактирования юзера
openPopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

// Закрыть окно редактирования юзера
closePopupButton.addEventListener('click', function () {
  togglePopupWindow(popupWindow);
});

// Отобразить в попа-апе данные юзера
inputFieldName.value = userName.textContent;
inputFieldDescription.value = userDescription.textContent;

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
    createPhotoWindow(card);
  });

  return newCard;
}

// =============== Функция создания поп-ап окна фотокарточки ===============
// Передаём функции параметры, она встраивает их в код шаблона

const photoWindow = document.querySelector('.popup_photo-window');
const displayedPhoto = document.querySelector('.popup__photo');
const displayedCaption = document.querySelector('.popup__figcaption');

function createPhotoWindow(object) {
  displayedPhoto.src = object.link;
  displayedPhoto.alt = object.name;
  displayedCaption.textContent = object.name;
  togglePopupWindow(photoWindow);

  // Закрываем окно
  const closePhotoWindowButton = document.querySelector('#close-photo-window-button');
  closePhotoWindowButton.addEventListener('click', function () {
    photoWindow.classList.remove('popup_opened');
  });
}

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

/* Сохранить на странице новую карточку */
popupPhotoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = { name: '', link: '' };
  newCardData.name = document.querySelector('.popup__input-field_type_photo-name').value;
  newCardData.link = document.querySelector('.popup__input-field_type_photo-url').value;
  const newItem = createCard(newCardData);
  cardsSection.prepend(newItem);
  togglePopupWindow(popupPhotoWindow);
  document.querySelector('.popup__input-field_type_photo-name').value = '';
  document.querySelector('.popup__input-field_type_photo-url').value = '';
});

// =============== Заполнить страницу дефолтными ккарточками ===============

const initialCards = [
  {
    name: 'Двуглавая сопка',
    link: './images/photo-dvuglavaya-sopka.jpg'
  },
  {
    name: 'Каменная река',
    link: './images/photo-kamennaya-reka.jpg'
  },
  {
    name: 'Круглица',
    link: './images/photo-kruglitsa.jpg'
  },
  {
    name: 'Откликной гребень',
    link: './images/photo-otkliknoy-greben.jpg'
  },
  {
    name: 'Вид с Круглицы',
    link: './images/photo-vid-s-kruglitsi.jpg'
  },
  {
    name: 'Вид с метеостанции',
    link: './images/photo-vid-s-meteostansii.jpg'
  }
];

/* Создать первые 6 фотокарточек */
initialCards.forEach(function (item) {
  const newItem = createCard(item);
  cardsSection.prepend(newItem);
});
