// =============== КОД ДЛЯ ИЗМЕНЕНИЯ ИНФОРМАЦИИ ЮЗЕРА ===============

const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popupWindow = document.querySelector('#user-popup-window');
const popupForm = document.querySelector('.popup__form');

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__description');
const inputFieldName = document.querySelector('.popup__input-field_type_name');
const inputFieldDescription = document.querySelector('.popup__input-field_type_description');

/* Открыть или скрыть всплывающее окно - общая функция */
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

// =============== КОД ДЛЯ ВЗАИМОДЕЙСТВИЯ С ФОТОКАРТОЧКАМИ ===============

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

const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;
const cardTemplateElement = cardTemplateContent.querySelector('.elements__card');
const cardsSection = document.querySelector('.elements');
//

/* Создать фотокарточку, удалить, поставить лайк */
function createCard(card) {
  const newCard = cardTemplateElement.cloneNode(true);
  /** @type {HTMLImageElement} */
  const newCardImage = newCard.querySelector('.elements__photo');
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  const newCardName = newCard.querySelector('.elements__photo-name');
  newCardName.textContent = card.name;

  const deleteButton = newCard.querySelector('.elements__del-button');
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.elements__card').remove();
  });

  const likeButton = newCard.querySelector('.elements__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-button_active');
  });

  return newCard;
}

/* Создать первые 6 фотокарточек */
initialCards.forEach(function (item) {
  const newItem = createCard(item);
  cardsSection.prepend(newItem);
});

// =============== КОД ДЛЯ ВЗАИМОДЕЙСТВИЯ С ОКНОМ ДОБАВЛЕНИЯ ФОТОКАРТОЧКИ ===============

const addPhotoButton = document.querySelector('#add-photo-button');
const closePhotoButton = document.querySelector('#close-photo-add-button');

const popupPhotoWindow = document.querySelector('#photo-popup-window');
const popupPhotoForm = document.querySelector('#popup__photo-form');

/* Открыть окно добавления фото */
addPhotoButton.addEventListener('click', function () {
  togglePopupWindow(popupPhotoWindow);
});

/* Закрыть окно добавления фото */
closePhotoButton.addEventListener('click', function () {
  togglePopupWindow(popupPhotoWindow);
});

/* Сохранить на странице новые данные юзера */
const inputPhotoName = document.querySelector('.popup__input-field_type_name');
const inputPhotoUrl = document.querySelector('.popup__input-field_type_photo-url');
popupPhotoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = { name: '', link: '' };
  newCardData.name = document.querySelector('.popup__input-field_type_photo-name').value;
  newCardData.link = document.querySelector('.popup__input-field_type_photo-url').value;
  const newItem = createCard(newCardData);
  cardsSection.prepend(newItem);
  togglePopupWindow(popupPhotoWindow);
});

/* Добавить новую фотокарточку */
