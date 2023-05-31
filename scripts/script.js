//
// ======= Переменные, относящиеся к поп-апу редактирования данных юзера ======= //
const popupEditProfile = document.querySelector('#popup-edit-profile');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = document.querySelector('.popup__close-button');

// ======= Переменные, относящиеся к данным юзера ======= //
const currentUserName = document.querySelector('.profile__username');
const currentUserDescription = document.querySelector('.profile__description');
const newUserName = document.querySelector('.popup__input-field_type_name');
const newUserDescription = document.querySelector('.popup__input-field_type_description');

// ======= Переменные, относящиеся к созданию фотокарточки на странице ======= //
const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;
const cardTemplateElement = cardTemplateContent.querySelector('.elements__card');
const cardsSection = document.querySelector('.elements');

// ======= Переменные, относящиеся к поп-апу просмотра фотографии ======= //
const popupPhotoWindow = document.querySelector('.popup_photo-window');
const photoToDisplay = popupPhotoWindow.querySelector('.popup__photo');
const captionToDisplay = popupPhotoWindow.querySelector('.popup__figcaption');
const closePhotoWindowButton = document.querySelector('#close-photo-window-button');

// ======= Переменные, относящиеся к поп-апу добавления фотографии ======= //
const popupAddPhoto = document.querySelector('#photo-add-popup-window');
const formAddPhoto = document.querySelector('#popup__photo-form');
const buttonAddPhoto = document.querySelector('#add-photo-button');
const buttonAddPhotoClose = document.querySelector('#close-photo-add-button');
const newPhotoName = document.querySelector('.popup__input-field_type_photo-name');
const newPhotoLink = document.querySelector('.popup__input-field_type_photo-url');

// ..................... ФУНКЦИИ ..................... //

// Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открыть окно редактирования данных юзера и отобразить актуальные данные
buttonOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
  newUserName.value = currentUserName.textContent;
  newUserDescription.value = currentUserDescription.textContent;
});

// Закрыть окно редактирования юзера
buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

// Сохранить на странице новые данные юзера
editProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  currentUserName.textContent = newUserName.value;
  currentUserDescription.textContent = newUserDescription.value;
  closePopup(popupEditProfile);
});

// Создать элемент фотокарточки
function createCard(card) {
  const newCard = cardTemplateElement.cloneNode(true);
  /** @type {HTMLImageElement} */
  const newCardImage = newCard.querySelector('.elements__photo');
  const newCardName = newCard.querySelector('.elements__photo-name');
  const deleteCardButton = newCard.querySelector('.elements__del-button');
  const likeButton = newCard.querySelector('.elements__like-button');
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  newCardName.textContent = card.name;

  // Удалить фотокарточку
  deleteCardButton.addEventListener('click', function () {
    cardsSection.removeChild(newCard);
    //deleteCardButton.closest('.elements__card').remove(); - тоже рабочий метод
  });

  // Слушатель лайка фотокарточки
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-button_active');
  });

  // Слушатель открытия поп-апа картинки
  newCardImage.addEventListener('click', function () {
    showPhotoWindow(card);
  });

  return newCard;
}

// Открыть поп-ап с изображением
function showPhotoWindow(object) {
  photoToDisplay.src = object.link;
  photoToDisplay.alt = object.name;
  captionToDisplay.textContent = object.name;
  openPopup(popupPhotoWindow);
}

// ..................... СЛУШАТЕЛИ ..................... //

// Слушатель сохранения новой карточки с фото
formAddPhoto.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = { name: '', link: '' };
  newCardData.name = newPhotoName.value;
  newCardData.link = newPhotoLink.value;
  const newItem = createCard(newCardData);
  cardsSection.prepend(newItem);
  closePopup(popupAddPhoto);
  newPhotoName.value = '';
  newPhotoLink.value = '';
});

// Слушатель закрытия поп-ап с изображением
closePhotoWindowButton.addEventListener('click', function () {
  closePopup(popupPhotoWindow);
});

// Слушатель открытия поп-апа добавления нового фото
buttonAddPhoto.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});

// Слушатель закрытия поп-апа добавления фото
buttonAddPhotoClose.addEventListener('click', function () {
  closePopup(popupAddPhoto);
});

// ......... Заполнить страницу дефолтными ккарточками ......... //
initialCards.forEach(function (item) {
  const newItem = createCard(item);
  cardsSection.prepend(newItem);
});
