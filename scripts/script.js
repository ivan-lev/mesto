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

/* Создать фотокарточку из картинки и текста */
function createCard(card) {
  const newCard = cardTemplateElement.cloneNode(true);
  /** @type {HTMLImageElement} */
  const newCardImage = newCard.querySelector('.elements__photo');
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  const newCardName = newCard.querySelector('.elements__photo-name');
  newCardName.textContent = card.name;
  return newCard;
}

/* Создать первые 6 фотокарточек */
initialCards.forEach(function (item) {
  const newItem = createCard(item);
  cardsSection.prepend(newItem);
});
