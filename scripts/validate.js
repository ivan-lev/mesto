// Функция, добавляющая класс с ошибкой и отображающяя сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция, удаляющая класс с ошибкой и скрывающая сообщение об ошибке
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция, проверяющая валидность поля
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, показывает ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    // Если проходит проходит, ошибка скрывается
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Функция, вешающая слушатели на все поля формы
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  // Создаёт массив из всех полей внутри формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // Найти кнопку в форме
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // Обходит массив и каждому полю добавляет обработчик события input
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызывает isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, inputErrorClass, errorClass);

      // Вызвать toggleButtonState и передать ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Функция, запускающая валидацию
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  // Создаёт массив из всех формы с классом .popup__form
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Для каждого элемента коллекции вызывает функцию setEventListeners,
  formList.forEach(formElement => {
    // и передаёт ей элемент формы
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
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

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  //console.log('Неактивный класс ' + inactiveButtonClass);
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
