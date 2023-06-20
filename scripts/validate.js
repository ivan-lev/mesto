// const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__input');
// const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, добавляющая класс с ошибкой и отображающяя сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// Функция, удаляющая класс с ошибкой и скрывающая сообщение об ошибке
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

// Функция, проверяющая валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, показывает ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит проходит, ошибка скрывается
    hideInputError(formElement, inputElement);
  }
};

// Функция, вешающая слушатели на все поля формы
const setEventListeners = formElement => {
  // Создаёт массив из всех полей внутри формы
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // Найти кнопку в форме
  const buttonElement = formElement.querySelector('.popup__submit-button');

  // Обходит массив и каждому полю добавляет обработчик события input
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызывает isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      // Вызвать toggleButtonState и передать ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция, запускающая валидацию
const enableValidation = () => {
  // Создаёт массив из всех формы с классом .popup__form
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // Для каждого элемента коллекции вызывает функцию setEventListeners,
  formList.forEach(formElement => {
    // и передаёт ей элемент формы
    setEventListeners(formElement);
  });
};

// Функция проходит методом some по списку инпутов в форме и возвращает true,
// если хотя бы одно невалидно
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    // Если поле не валидно, колбэк вернёт true в функцию, а она вернёт его дальше
    return !inputElement.validity.valid;
  });
};

// Функция, принимающая массив полей ввода и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__submit-button_disabled');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__submit-button_disabled');
    buttonElement.removeAttribute('disabled');
  }
};

// Вызовем функцию
enableValidation();

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
