import { showPhotoWindow, cardsSection } from './index.js';

export class Card {
  constructor(data, template) {
    this._imageLink = data.imageLink;
    this._imageTitle = data.imageTitle;
    this._template = template;
  }

  // приватный метод - возвращает шаблон карточки
  _getTemplate() {
    return this._template.cloneNode(true);
  }

  // приватный метод - создаёт слушатели, открывающие попап с изображением
  _setEventListeners() {
    this._element.querySelector('.cards__card-image').addEventListener('click', () => {
      showPhotoWindow({ link: this._imageLink, name: this._imageTitle });
    });
  }

  // публичный метод - генерирует новую карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__card-image').src = this._imageLink;
    this._element.querySelector('.cards__card-image').alt = this._imageTitle;
    this._element.querySelector('.cards__card-title').textContent = this._imageTitle;

    //находим в генерируемой карточке кнопку лайка и создаем слушатель
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('cards__like-button_active');
    });

    //находим в генерируемой карточке кнопку удалния и создаем слушатель
    this._deleteButton = this._element.querySelector('.cards__del-button');
    this._deleteButton.addEventListener('click', () => {
      cardsSection.removeChild(this._element);
    });

    return this._element;
  }
}
