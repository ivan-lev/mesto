//
// ======= Переменные, относящиеся к данным юзера ======= //
const currentUserName = document.querySelector('.profile__username');
const currentUserDescription = document.querySelector('.profile__description');
const newUserName = document.querySelector('.popup__input_type_name');
const newUserDescription = document.querySelector('.popup__input_type_description');

// ======= Переменные, относящиеся к созданию фотокарточки на странице ======= //
const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;
const cardTemplateElement = cardTemplateContent.querySelector('.cards__card');
const cardsSection = document.querySelector('.cards');

// ======= Переменные, относящиеся к поп-апу редактирования данных юзера ======= //
const popupEditProfile = document.querySelector('#popup-edit-profile');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = document.querySelector('.popup__close-button');

// ======= Переменные, относящиеся к поп-апу просмотра фотографии ======= //
const popupPhotoWindow = document.querySelector('.popup_photo-window');
const photoToDisplay = popupPhotoWindow.querySelector('.popup__photo');
const captionToDisplay = popupPhotoWindow.querySelector('.popup__figcaption');
const buttonClosePhotoWindow = document.querySelector('#close-photo-window-button');

// ======= Переменные, относящиеся к поп-апу добавления места ======= //
const popupAddPlace = document.querySelector('#place-add-popup-window');
const formAddPlace = document.querySelector('#popup__photo-form');
const buttonOpenPopupAddPlace = document.querySelector('#open-popup-add-photo-button');
const buttonCloseAddPlace = document.querySelector('#close-photo-add-button');
const newPlaceName = document.querySelector('.popup__input_type_photo-name');
const newPlaceLink = document.querySelector('.popup__input_type_photo-url');
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

// Фенкция закрытия окна по нажатию Esc
const closePopupByEsc = event => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Фенкция закрытия окна по клику на оверлее
const closePopupByOverlay = event => {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.target === openedPopup) {
    closePopup(openedPopup);
  }
};

// Создать элемент фотокарточки, сбросить поля ввода, сделать кнопку неактивной
// создать слкшатели на удаление, лайк
const createCard = card => {
  const newCard = cardTemplateElement.cloneNode(true);
  const newCardImage = newCard.querySelector('.cards__photo');
  const newCardName = newCard.querySelector('.cards__photo-name');
  const deleteCardButton = newCard.querySelector('.cards__del-button');
  const likeButton = newCard.querySelector('.cards__like-button');
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  newCardName.textContent = card.name;

  // Удалить фотокарточку
  deleteCardButton.addEventListener('click', function () {
    cardsSection.removeChild(newCard);
    //deleteCardButton.closest('.cards__card').remove(); - тоже рабочий метод
  });

  // Слушатель лайка фотокарточки
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('cards__like-button_active');
  });

  // Слушатель открытия поп-апа картинки
  newCardImage.addEventListener('click', function () {
    showPhotoWindow(card);
  });

  return newCard;
};

// Открыть поп-ап с изображением
const showPhotoWindow = object => {
  photoToDisplay.src = object.link;
  photoToDisplay.alt = object.name;
  captionToDisplay.textContent = object.name;
  openPopup(popupPhotoWindow);
};

// ..................... СЛУШАТЕЛИ ..................... //

// Открыть окно редактирования данных юзера и отобразить актуальные данные
// Сбрасываем состояния элементов формы, так как данные юзера валидны
buttonOpenEditProfile.addEventListener('click', function () {
  const inputList = Array.from(popupEditProfile.querySelectorAll('.popup__input'));
  const errorList = Array.from(popupEditProfile.querySelectorAll('.popup__error'));
  const profileSubmitButton = popupEditProfile.querySelector('.popup__submit-button');
  inputList.forEach(inputElement => inputElement.classList.remove('popup__input_type_error'));
  errorList.forEach(errorElement => errorElement.classList.remove('popup__error_visible'));
  profileSubmitButton.classList.remove('popup__submit-button_disabled');

  //   errorList.forEach((errorElement) => {
  //     item.classList.add('text_is-active');
  //  });

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

// Сохранить на странице новую карточку с фото
formAddPlace.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = { name: newPlaceName.value, link: newPlaceLink.value };
  const newItem = createCard(newCardData);
  cardsSection.prepend(newItem);
  closePopup(popupAddPlace);
  formAddPlace.reset();
});

// Закрыть поп-ап с изображением
buttonClosePhotoWindow.addEventListener('click', function () {
  closePopup(popupPhotoWindow);
});

// Слушатель открытия добавления нового места
// Если поля формы невалидны, то деактивируем кнопку,
// затем открываем поп-ап
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

// Закрыть поп-ап добавления фото
buttonCloseAddPlace.addEventListener('click', function () {
  closePopup(popupAddPlace);
});

// ......... Заполнить страницу дефолтными карточками ......... //
initialCards.forEach(function (item) {
  const newItem = createCard(item);
  cardsSection.prepend(newItem);
});
