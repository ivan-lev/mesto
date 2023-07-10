import { showPhotoWindow, cardsSection, cardTemplateElement } from './index.js';

export class Card {
  constructor(data) {
    this._imageLink = data.imageLink;
    this._imageTitle = data.imageTitle;
  }

  // находим шаблон карточки и возвращаем его
  _getTemplate() {
    return cardTemplateElement.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__card-image').src = this._imageLink;
    this._element.querySelector('.cards__card-title').textContent = this._imageTitle;

    //находим в генерируемой карточке кнопку лайка и вешаем слушатель
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('cards__like-button_active');
    });

    this._deleteButton = this._element.querySelector('.cards__del-button');
    this._deleteButton.addEventListener('click', () => {
      cardsSection.removeChild(this._element);
    });

    return this._element;
  }

  _setEventListeners() {
    // слушатель открытия попапа
    this._element.querySelector('.cards__card-image').addEventListener('click', () => {
      showPhotoWindow({ link: this._imageLink, name: this._imageTitle });
    });
  }
}
